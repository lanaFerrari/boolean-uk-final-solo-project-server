const { user } = require("../../utils/database");
const prisma = require("../../utils/database");

async function getAllGames(req, res) {
  try {
    const games = await prisma.game.findMany();

    res.json({ games });
  } catch (error) {
    console.error({ error: error.message });
  }
}

async function createGame(req, res) {
  const id = req.user.id;

  try {
    const newGame = await prisma.game.create({
      data: {
        status: "start",
      },
    });

    const result = await prisma.usersOnGames.create({
      data: {
        userId: parseInt(id),
        gameId: newGame.id,
      },
    });

    res.json(newGame);
  } catch (error) {
    console.error({ error: error.message });
    res.status(500).json({ error: error.message });
  }
}

async function getGameWithUSers(req, res) {
  const id = parseInt(req.params.id);
  try {
    const game = await prisma.game.findUnique({
      where: {
        id,
      },
      include: {
        users: {
          select: {
            userId: true,
            gameId: true,
          },
        },
      },
    });

    const users = game.users.map((user) => {
      return user.userId;
    });

    const userInGame = await prisma.user.findMany({
      where: {
        id: users[0],
      },
    });

    const secondUserInGame = await prisma.user.findMany({
      where: {
        id: users[1],
      },
    });

    delete userInGame[0].password;
    delete userInGame[0].role;
    delete secondUserInGame[0].password;
    delete secondUserInGame[0].role;
    delete game.users;

    res.status(200).json({ game, userInGame, secondUserInGame });
  } catch (error) {
    console.error({ error: error.message });
    res.status(500).json({ error: error.message });
  }
}

async function joinGame(req, res) {
  const id = parseInt(req.params.id);
  const userId = parseInt(req.user.id);

  try {
    const result = await prisma.game.update({
      where: {
        id,
      },
      data: {
        users: {
          create: {
            user: {
              connect: {
                id: userId,
              },
            },
          },
        },
        status: "ongoing",
      },
      include: {
        users: {
          include: {
            user: {
              select: {
                id: true,
                userName: true,
              },
            },
          },
        },
      },
    });

    const users = result.users.map((user) => {
      return user.user;
    });

    res.status(200).json({ result, users });
  } catch (error) {
    console.error({ error: error.message });
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllGames,
  createGame,
  getGameWithUSers,
  joinGame,
};
