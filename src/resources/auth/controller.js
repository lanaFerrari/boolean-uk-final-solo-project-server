const prisma = require("../../utils/database");
const bcrypt = require("bcrypt");
const { createToken } = require("../../utils/authentication");

const signup = async (req, res) => {
  const userToCreate = { ...req.body };

  if (!userToCreate.userName || !userToCreate.password) {
    res.status(400).json({ error: "Missing information" });
  }

  try {
    const hashedPassword = await bcrypt.hash(userToCreate.password, 10);

    userToCreate.password = hashedPassword;

    const result = await prisma.user.create({
      data: {
        ...userToCreate,
      },
      select: {
        id: true,
        userName: true,
      },
    });

    const token = createToken(result);
    res.status(201).json(token);
  } catch (error) {
    console.error({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};
module.exports = { signup };
