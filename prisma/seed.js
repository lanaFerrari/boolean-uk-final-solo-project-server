const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

const hashedPasswordOne = await bcrypt.hash("andrew", 10);
const hashedPasswordTwo = await bcrypt.hash("anna", 10);

async function seed() {
  const users = [
    {
      userName: "Andrew",
      password: hashedPasswordOne,
      score: 0,
      role: "USER",
    },
    {
      userName: "Anna",
      password: hashedPasswordTwo,
      score: 0,
      role: "USER",
    },
  ];

  const userPromises = users.map(async (user) => {
    return await prisma.user.create({ data: user });
  });

  try {
    await Promise.all(userPromises);
  } catch (error) {
    console.error("[ERROR] Seeding user model: ", {
      code: error.code,
      error: error.message,
    });

    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
