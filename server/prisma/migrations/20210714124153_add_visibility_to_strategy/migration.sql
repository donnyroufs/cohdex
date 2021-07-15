-- CreateEnum
CREATE TYPE "Visibility" AS ENUM ('PUBLIC', 'PRIVATE');

-- AlterTable
ALTER TABLE "Strategy" ADD COLUMN     "visibility" "Visibility" NOT NULL DEFAULT E'PRIVATE';
