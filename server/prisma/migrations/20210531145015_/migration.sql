/*
  Warnings:

  - A unique constraint covering the columns `[scenarioName]` on the table `Map` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `scenarioName` to the `Map` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Map" ADD COLUMN     "scenarioName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Map.scenarioName_unique" ON "Map"("scenarioName");
