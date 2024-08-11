/*
  Warnings:

  - You are about to drop the column `hederaPrivateKey` on the `Consumer` table. All the data in the column will be lost.
  - You are about to drop the column `hederaPublicKey` on the `Consumer` table. All the data in the column will be lost.
  - You are about to drop the column `hederaPrivateKey` on the `Prosumer` table. All the data in the column will be lost.
  - You are about to drop the column `hederaPublicKey` on the `Prosumer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Consumer" DROP COLUMN "hederaPrivateKey",
DROP COLUMN "hederaPublicKey";

-- AlterTable
ALTER TABLE "Prosumer" DROP COLUMN "hederaPrivateKey",
DROP COLUMN "hederaPublicKey";
