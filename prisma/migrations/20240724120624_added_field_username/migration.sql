/*
  Warnings:

  - Added the required column `username` to the `Consumer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `Prosumer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Consumer" ADD COLUMN     "username" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Prosumer" ADD COLUMN     "username" TEXT NOT NULL;
