const prisma = require("../utils/database");
const jwt = require("jsonwebtoken");

const secretKey = process.env.JWT_SECRET;

const createToken = (user) => {
  return jwt.sign({ ...user }, secretKey, { expiresIn: "8h" });
};

function protect(req, res, next) {
  // Get the token from the client side (headers)
  // jwt verify token and access the id
  // Match with the database to find the unique userId
  // req.user=user to send back to the next function

  const token = req.headers.authorization;
  console.log("TOKEN", token);

  jwt.verify(token, secretKey, async (err, payload) => {
    if (err) {
      throw Error("Not Authorized");
    }
    console.log("Payload", payload);

    const user = await prisma.user.findUnique({
      where: {
        id: payload.id,
      },
    });

    delete user.password;

    req.user = user;

    console.log("User going to func", user);

    next();
  });
}

function protectAdmin(req, res, next) {
  const token = req.headers.authorization;
  console.log("TOKEN", token);

  jwt.verify(token, secretKey, async (err, payload) => {
    if (err) {
      throw Error("Not Authorized");
    }
    console.log("Payload", payload);

    const user = await prisma.user.findUnique({
      where: {
        id: payload.id,
      },
    });

    delete user.password;

    if (user.role !== "ADMIN") {
      throw error("Not authorized");
    }

    req.user = user;

    console.log("User going to func", user);

    next();
  });
}

module.exports = { createToken, protect, protectAdmin };
