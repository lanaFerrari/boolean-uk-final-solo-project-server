const prisma = require("../../utils/database");
const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET;

async function getProfile(req, res) {
  const token = req.headers.authorization;
  console.log({ token });

  jwt.verify(token, secretKey, async (err, decoded) => {
    if (err) {
      throw Error("Not Authorized");
    }
    console.log("DECODED", decoded);

    try {
      const profile = await prisma.user.findUnique({
        where: {
          id: parseInt(decoded.id),
        },
      });
      res.json({ profile });
    } catch (error) {
      console.error({ error: error.message });
    }
  });
}

module.exports = { getProfile };
