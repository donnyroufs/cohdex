-- CreateEnum
CREATE TYPE "UnitCommand" AS ENUM ('MOVE', 'CAPTURE');

-- CreateEnum
CREATE TYPE "Team" AS ENUM ('AXIS', 'ALLIES');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "steamId" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "profileUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Map" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "scenarioName" TEXT NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "width" DOUBLE PRECISION NOT NULL,
    "maxPlayers" INTEGER NOT NULL DEFAULT 2,
    "version" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

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

-- CreateTable
CREATE TABLE "Strategy" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "mapId" INTEGER NOT NULL,
    "factionId" INTEGER NOT NULL,
    "alliedFactionId" INTEGER NOT NULL,
    "axisFactionId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Faction" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "abbreviation" TEXT NOT NULL,
    "imgUrl" TEXT NOT NULL,
    "team" "Team" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Unit" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "movementSpeed" DOUBLE PRECISION NOT NULL DEFAULT 0.25,
    "cappingSpeed" DOUBLE PRECISION NOT NULL DEFAULT 1,
    "factionId" INTEGER NOT NULL,
    "startingUnit" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Command" (
    "id" SERIAL NOT NULL,
    "type" "UnitCommand" NOT NULL,
    "description" TEXT,
    "strategyUnitsId" INTEGER,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StrategyUnits" (
    "id" SERIAL NOT NULL,
    "unitId" INTEGER NOT NULL,
    "strategyId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User.steamId_unique" ON "User"("steamId");

-- CreateIndex
CREATE UNIQUE INDEX "Map.name_unique" ON "Map"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Map.scenarioName_unique" ON "Map"("scenarioName");

-- CreateIndex
CREATE UNIQUE INDEX "Strategy.title_userId_factionId_alliedFactionId_axisFactionId_mapId_unique" ON "Strategy"("title", "userId", "factionId", "alliedFactionId", "axisFactionId", "mapId");

-- CreateIndex
CREATE UNIQUE INDEX "Faction.name_unique" ON "Faction"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Faction.abbreviation_unique" ON "Faction"("abbreviation");

-- CreateIndex
CREATE UNIQUE INDEX "Faction.imgUrl_unique" ON "Faction"("imgUrl");

-- CreateIndex
CREATE UNIQUE INDEX "Unit.name_unique" ON "Unit"("name");

-- AddForeignKey
ALTER TABLE "Unit" ADD FOREIGN KEY ("factionId") REFERENCES "Faction"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Strategy" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Strategy" ADD FOREIGN KEY ("mapId") REFERENCES "Map"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Strategy" ADD FOREIGN KEY ("factionId") REFERENCES "Faction"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Strategy" ADD FOREIGN KEY ("alliedFactionId") REFERENCES "Faction"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Strategy" ADD FOREIGN KEY ("axisFactionId") REFERENCES "Faction"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PointPosition" ADD FOREIGN KEY ("mapId") REFERENCES "Map"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Command" ADD FOREIGN KEY ("strategyUnitsId") REFERENCES "StrategyUnits"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Command" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StrategyUnits" ADD FOREIGN KEY ("unitId") REFERENCES "Unit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StrategyUnits" ADD FOREIGN KEY ("strategyId") REFERENCES "Strategy"("id") ON DELETE CASCADE ON UPDATE CASCADE;
