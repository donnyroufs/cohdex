/*
  Warnings:

  - You are about to drop the column `posX` on the `Command` table. All the data in the column will be lost.
  - You are about to drop the column `posY` on the `Command` table. All the data in the column will be lost.
  - Added the required column `targetX` to the `Command` table without a default value. This is not possible if the table is not empty.
  - Added the required column `targetY` to the `Command` table without a default value. This is not possible if the table is not empty.
  - Added the required column `x` to the `Command` table without a default value. This is not possible if the table is not empty.
  - Added the required column `y` to the `Command` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Command" DROP COLUMN "posX",
DROP COLUMN "posY",
ADD COLUMN     "targetX" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "targetY" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "x" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "y" DOUBLE PRECISION NOT NULL;
