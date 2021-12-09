const prisma = require("../../utils/database");

async function getProfile(req, res) {
  const userId = req.user.id;
  // console.log("Id inside getProfile", userId);

  try {
    const profile = await prisma.user.findUnique({
      where: {
        id: parseInt(userId),
      },
      select: {
        id: true,
        userName: true,
        password: false,
        score: true,
        role: true,
        games: {
          select: {
            game: true,
          },
        },
      },
    });

    const userGames = profile.games.map((game) => {
      return game.game;
    });

    delete profile.games;

    const userWithGames = { profile, userGames };
    // console.log("User With Games", userWithGames);
    res.status(200).json({ userWithGames });
  } catch (error) {
    console.error({ error: error.message });
  }
}

module.exports = { getProfile };
