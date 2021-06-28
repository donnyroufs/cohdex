/*
  Warnings:

  - Added the required column `posX` to the `Command` table without a default value. This is not possible if the table is not empty.
  - Added the required column `posY` to the `Command` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `Command` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Command" ADD COLUMN     "posX" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "posY" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "description" DROP DEFAULT;
