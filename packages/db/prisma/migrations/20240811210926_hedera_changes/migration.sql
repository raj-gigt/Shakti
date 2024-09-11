-- AlterTable
ALTER TABLE "Consumer" ADD COLUMN     "hederaAccountId" TEXT,
ADD COLUMN     "hederaPrivateKey" TEXT,
ADD COLUMN     "hederaPublicKey" TEXT;

-- AlterTable
ALTER TABLE "Prosumer" ADD COLUMN     "hederaAccountId" TEXT,
ADD COLUMN     "hederaPrivateKey" TEXT,
ADD COLUMN     "hederaPublicKey" TEXT;
