/*
  Warnings:

  - A unique constraint covering the columns `[title,userId,factionId,alliesFactionId,axisFactionId,mapId]` on the table `Strategy` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Strategy.title_userId_factionId_alliesFactionId_axisFactionId_u";

-- CreateIndex
CREATE UNIQUE INDEX "Strategy.title_userId_factionId_alliesFactionId_axisFactionId_mapId_unique" ON "Strategy"("title", "userId", "factionId", "alliesFactionId", "axisFactionId", "mapId");
