/*
  Warnings:

  - Changed the type of `Volume` on the `BuyOrderBook` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `Price` on the `BuyOrderBook` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `Volume` on the `SellOrderBook` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `Price` on the `SellOrderBook` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `Volume` on the `Transactions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `Price` on the `Transactions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "BuyOrderBook" DROP COLUMN "Volume",
ADD COLUMN     "Volume" INTEGER NOT NULL,
DROP COLUMN "Price",
ADD COLUMN     "Price" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "SellOrderBook" DROP COLUMN "Volume",
ADD COLUMN     "Volume" INTEGER NOT NULL,
DROP COLUMN "Price",
ADD COLUMN     "Price" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Transactions" DROP COLUMN "Volume",
ADD COLUMN     "Volume" INTEGER NOT NULL,
DROP COLUMN "Price",
ADD COLUMN     "Price" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "Transactions_SellerId_idx" ON "Transactions"("SellerId");

-- CreateIndex
CREATE INDEX "Transactions_BuyerId_idx" ON "Transactions"("BuyerId");
