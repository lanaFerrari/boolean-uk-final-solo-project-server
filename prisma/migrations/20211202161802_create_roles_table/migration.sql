/*
  Warnings:

  - You are about to drop the `usersOnGames` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN', 'SUPERUSER');

-- DropForeignKey
ALTER TABLE "usersOnGames" DROP CONSTRAINT "usersOnGames_gameId_fkey";

-- DropForeignKey
ALTER TABLE "usersOnGames" DROP CONSTRAINT "usersOnGames_userId_fkey";

-- DropTable
DROP TABLE "usersOnGames";

-- CreateTable
CREATE TABLE "UsersOnGames" (
    "userId" INTEGER NOT NULL,
    "gameId" INTEGER NOT NULL,

    CONSTRAINT "UsersOnGames_pkey" PRIMARY KEY ("userId","gameId")
);

-- AddForeignKey
ALTER TABLE "UsersOnGames" ADD CONSTRAINT "UsersOnGames_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnGames" ADD CONSTRAINT "UsersOnGames_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
