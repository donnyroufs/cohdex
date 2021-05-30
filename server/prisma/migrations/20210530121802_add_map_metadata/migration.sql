/*
  Warnings:

  - Added the required column `height` to the `Map` table without a default value. This is not possible if the table is not empty.
  - Added the required column `version` to the `Map` table without a default value. This is not possible if the table is not empty.
  - Added the required column `width` to the `Map` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Map" ADD COLUMN     "height" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "maxPlayers" INTEGER NOT NULL DEFAULT 2,
ADD COLUMN     "version" INTEGER NOT NULL,
ADD COLUMN     "width" DOUBLE PRECISION NOT NULL;

-- CreateTable
CREATE TABLE "PointPosition" (
    "id" SERIAL NOT NULL,
    "x" DOUBLE PRECISION NOT NULL,
    "y" DOUBLE PRECISION NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "fileName" TEXT NOT NULL,
    "mapId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PointPosition" ADD FOREIGN KEY ("mapId") REFERENCES "Map"("id") ON DELETE CASCADE ON UPDATE CASCADE;
