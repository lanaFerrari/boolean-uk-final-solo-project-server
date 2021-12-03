/*
  Warnings:

  - A unique constraint covering the columns `[id,status]` on the table `Game` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `status` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "status" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Game_id_status_key" ON "Game"("id", "status");
