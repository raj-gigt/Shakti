/*
  Warnings:

  - You are about to drop the column `hederaAccountId` on the `Consumer` table. All the data in the column will be lost.
  - You are about to drop the column `hederaAccountId` on the `Prosumer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Consumer" DROP COLUMN "hederaAccountId";

-- AlterTable
ALTER TABLE "Prosumer" DROP COLUMN "hederaAccountId";
