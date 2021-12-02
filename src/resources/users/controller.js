const prisma = require("../../utils/database");

async function getProfile(req, res) {
  const userId = req.user.id;
  console.log("Id inside getProfile", userId);

  try {
    const profile = await prisma.user.findUnique({
      where: {
        id: parseInt(userId),
      },
    });
    res.json({ profile });
  } catch (error) {
    console.error({ error: error.message });
  }
}

module.exports = { getProfile };
