-- AlterTable
ALTER TABLE "Consumer" ADD COLUMN     "setupStatus" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Prosumer" ADD COLUMN     "setupStatus" BOOLEAN NOT NULL DEFAULT false;
