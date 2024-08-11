-- CreateTable
CREATE TABLE "Prosumer" (
    "id" SERIAL NOT NULL,
    "connectionId" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "SolarCapacity" TEXT,
    "City" TEXT,
    "State" TEXT,
    "pincode" TEXT,
    "GPSLocation" TEXT,
    "Year" TEXT,
    "Load" TEXT,
    "Tilt" INTEGER,
    "Azimuth" INTEGER,
    "EnergyProdURL" TEXT,
    "LoadConsumptionURL" TEXT,
    "solarBrand" TEXT,
    "setupStatus" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Prosumer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Consumer" (
    "id" SERIAL NOT NULL,
    "connectionId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "Demand" TEXT,
    "City" TEXT,
    "State" TEXT,
    "pincode" TEXT,
    "Year" TEXT,
    "Load" TEXT,
    "LoadConsumptionURL" TEXT,
    "setupStatus" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Consumer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transactions" (
    "id" SERIAL NOT NULL,
    "date" TEXT NOT NULL,
    "TimeSlot" TEXT NOT NULL,
    "SellerId" TEXT NOT NULL,
    "BuyerId" TEXT NOT NULL,
    "Volume" INTEGER NOT NULL,
    "Price" INTEGER NOT NULL,

    CONSTRAINT "Transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SellOrderBook" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "TimeSlot" TEXT NOT NULL,
    "SellerId" TEXT NOT NULL,
    "Volume" INTEGER NOT NULL,
    "Price" INTEGER NOT NULL,

    CONSTRAINT "SellOrderBook_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BuyOrderBook" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "TimeSlot" TEXT NOT NULL,
    "BuyerId" TEXT NOT NULL,
    "Volume" INTEGER NOT NULL,
    "Price" INTEGER NOT NULL,

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

-- CreateIndex
CREATE INDEX "Transactions_SellerId_idx" ON "Transactions"("SellerId");

-- CreateIndex
CREATE INDEX "Transactions_BuyerId_idx" ON "Transactions"("BuyerId");

-- CreateIndex
CREATE INDEX "SellOrderBook_Price_idx" ON "SellOrderBook"("Price");

-- CreateIndex
CREATE INDEX "SellOrderBook_TimeSlot_idx" ON "SellOrderBook"("TimeSlot");

-- CreateIndex
CREATE INDEX "BuyOrderBook_Price_idx" ON "BuyOrderBook"("Price");

-- CreateIndex
CREATE INDEX "BuyOrderBook_TimeSlot_idx" ON "BuyOrderBook"("TimeSlot");

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_SellerId_fkey" FOREIGN KEY ("SellerId") REFERENCES "Prosumer"("connectionId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_BuyerId_fkey" FOREIGN KEY ("BuyerId") REFERENCES "Consumer"("connectionId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SellOrderBook" ADD CONSTRAINT "SellOrderBook_SellerId_fkey" FOREIGN KEY ("SellerId") REFERENCES "Prosumer"("connectionId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BuyOrderBook" ADD CONSTRAINT "BuyOrderBook_BuyerId_fkey" FOREIGN KEY ("BuyerId") REFERENCES "Consumer"("connectionId") ON DELETE RESTRICT ON UPDATE CASCADE;
