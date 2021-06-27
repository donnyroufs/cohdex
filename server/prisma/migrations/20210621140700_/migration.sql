/*
  Warnings:

  - You are about to drop the column `x` on the `Command` table. All the data in the column will be lost.
  - You are about to drop the column `y` on the `Command` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Command" DROP COLUMN "x",
DROP COLUMN "y";
