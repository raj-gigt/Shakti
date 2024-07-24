-- CreateTable
CREATE TABLE "Prosumer" (
    "id" SERIAL NOT NULL,
    "connectionId" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "SolarCapacity" TEXT NOT NULL,
    "City" TEXT NOT NULL,
    "State" TEXT NOT NULL,
    "pincode" TEXT NOT NULL,
    "GPSLocation" TEXT NOT NULL,
    "Year" INTEGER NOT NULL,
    "Load" TEXT NOT NULL,
    "EnergyProdURL" TEXT NOT NULL,
    "LoadConsumptionURL" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Prosumer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Consumer" (
    "id" SERIAL NOT NULL,
    "connectionId" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "Demand" TEXT NOT NULL,
    "City" TEXT NOT NULL,
    "State" TEXT NOT NULL,
    "pincode" TEXT NOT NULL,
    "Year" INTEGER NOT NULL,
    "Load" TEXT NOT NULL,
    "LoadConsumptionURL" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Consumer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transactions" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "TimeSlot" TEXT NOT NULL,
    "SellerId" TEXT NOT NULL,
    "BuyerId" TEXT NOT NULL,
    "Volume" TEXT NOT NULL,
    "Price" TEXT NOT NULL,

    CONSTRAINT "Transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SellOrderBook" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "TimeSlot" TEXT NOT NULL,
    "SellerId" TEXT NOT NULL,
    "Volume" TEXT NOT NULL,
    "Price" TEXT NOT NULL,

    CONSTRAINT "SellOrderBook_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BuyOrderBook" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "TimeSlot" TEXT NOT NULL,
    "BuyerId" TEXT NOT NULL,
    "Volume" TEXT NOT NULL,
    "Price" TEXT NOT NULL,

    CONSTRAINT "BuyOrderBook_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Prosumer_connectionId_key" ON "Prosumer"("connectionId");

-- CreateIndex
CREATE UNIQUE INDEX "Prosumer_phone_key" ON "Prosumer"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Consumer_connectionId_key" ON "Consumer"("connectionId");

-- CreateIndex
CREATE UNIQUE INDEX "Consumer_phone_key" ON "Consumer"("phone");

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_SellerId_fkey" FOREIGN KEY ("SellerId") REFERENCES "Prosumer"("connectionId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_BuyerId_fkey" FOREIGN KEY ("BuyerId") REFERENCES "Consumer"("connectionId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SellOrderBook" ADD CONSTRAINT "SellOrderBook_SellerId_fkey" FOREIGN KEY ("SellerId") REFERENCES "Prosumer"("connectionId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BuyOrderBook" ADD CONSTRAINT "BuyOrderBook_BuyerId_fkey" FOREIGN KEY ("BuyerId") REFERENCES "Consumer"("connectionId") ON DELETE RESTRICT ON UPDATE CASCADE;
