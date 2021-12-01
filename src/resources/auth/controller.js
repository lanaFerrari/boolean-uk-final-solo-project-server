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

async function login(req, res) {
  const { userName, password: passwordFromRequest } = req.body;

  if (!userName || !passwordFromRequest) {
    res.status(400).json({ error: "Missing information" });
  }

  try {
    const foundUser = await prisma.user.findUnique({
      where: {
        userName,
      },
    });

    if (!foundUser) {
      res.status(401).json({ message: "Not Authorized" });
    }

    const passwordFromData = foundUser.password;

    const matchingPasswords = await bcrypt.compare(
      passwordFromRequest,
      passwordFromData
    );

    if (matchingPasswords) {
      const userToToken = {
        ...foundUser,
      };

      delete userToToken.password;

      const token = createToken(userToToken);
      res.status(200).json({ token });
    } else {
      res.status(401).json({ message: "Not Authorized" });
    }
  } catch (error) {
    console.error({ error: error.message });
    res.status(500).json({ error: error.message });
  }
}

module.exports = { signup, login };
