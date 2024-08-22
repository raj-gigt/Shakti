/*
  Warnings:

  - Changed the type of `TimeSlot` on the `BuyOrderBook` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `TimeSlot` on the `SellOrderBook` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `TimeSlot` on the `Transactions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "BuyOrderBook" DROP COLUMN "TimeSlot",
ADD COLUMN     "TimeSlot" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "SellOrderBook" DROP COLUMN "TimeSlot",
ADD COLUMN     "TimeSlot" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Transactions" DROP COLUMN "TimeSlot",
ADD COLUMN     "TimeSlot" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "ProsumerData" (
    "id" SERIAL NOT NULL,
    "prosumerId" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "TimeSlot" INTEGER NOT NULL,
    "Solargeneration" INTEGER NOT NULL,
    "netEnergy" INTEGER NOT NULL,

    CONSTRAINT "ProsumerData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConsumerData" (
    "id" SERIAL NOT NULL,
    "consumerId" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "TimeSlot" INTEGER NOT NULL,
    "energyConsumption" INTEGER NOT NULL,

    CONSTRAINT "ConsumerData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ProsumerData_prosumerId_idx" ON "ProsumerData"("prosumerId");

-- CreateIndex
CREATE INDEX "ProsumerData_date_idx" ON "ProsumerData"("date");

-- CreateIndex
CREATE INDEX "ConsumerData_consumerId_idx" ON "ConsumerData"("consumerId");

-- CreateIndex
CREATE INDEX "ConsumerData_date_idx" ON "ConsumerData"("date");

-- CreateIndex
CREATE INDEX "BuyOrderBook_TimeSlot_idx" ON "BuyOrderBook"("TimeSlot");

-- CreateIndex
CREATE INDEX "SellOrderBook_TimeSlot_idx" ON "SellOrderBook"("TimeSlot");

-- AddForeignKey
ALTER TABLE "ProsumerData" ADD CONSTRAINT "ProsumerData_prosumerId_fkey" FOREIGN KEY ("prosumerId") REFERENCES "Prosumer"("connectionId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsumerData" ADD CONSTRAINT "ConsumerData_consumerId_fkey" FOREIGN KEY ("consumerId") REFERENCES "Consumer"("connectionId") ON DELETE RESTRICT ON UPDATE CASCADE;
