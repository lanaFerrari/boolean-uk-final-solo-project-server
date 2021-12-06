const { user } = require("../../utils/database");
const prisma = require("../../utils/database");

async function getAllGames(req, res) {
  const userId = req.user.id;
  try {
    const games = await prisma.games.findMany({
      where: {
        userId,
      },
    });
    res.json({ games });
  } catch (error) {
    console.error({ error: error.message });
  }
}

async function createGame(req, res) {
  const id = req.user.id;
  console.log("REQ", id);

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

    delete game.users;
    res.status(200).json({ game, users });
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
        gameStatus: "ongoing",
      },
      include: {
        users: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
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
