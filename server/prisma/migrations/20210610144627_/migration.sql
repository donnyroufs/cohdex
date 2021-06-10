/*
  Warnings:

  - Made the column `unitId` on table `StrategyUnits` required. This step will fail if there are existing NULL values in that column.
  - Made the column `strategyId` on table `StrategyUnits` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Command" ADD COLUMN     "strategyUnitsId" INTEGER;

-- AlterTable
ALTER TABLE "StrategyUnits" ALTER COLUMN "unitId" SET NOT NULL,
ALTER COLUMN "strategyId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Command" ADD FOREIGN KEY ("strategyUnitsId") REFERENCES "StrategyUnits"("id") ON DELETE SET NULL ON UPDATE CASCADE;
