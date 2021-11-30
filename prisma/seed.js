const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function seed() {
  const users = [
    {
      userName: "Andrew",
      password: "andrew",
      score: 0,
    },
    {
      userName: "Anna",
      password: "anna",
      score: 0,
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
