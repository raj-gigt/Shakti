-- CreateTable
CREATE TABLE "Prosumer" (
    "id" SERIAL NOT NULL,
    "connectionId" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "SolarCapacity" DOUBLE PRECISION,
    "City" TEXT,
    "State" TEXT,
    "pincode" TEXT,
    "GPSLocation" TEXT,
    "Year" TEXT,
    "Load" DOUBLE PRECISION,
    "Tilt" DOUBLE PRECISION,
    "Azimuth" DOUBLE PRECISION,
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
    "Demand" DOUBLE PRECISION,
    "City" TEXT,
    "State" TEXT,
    "pincode" TEXT,
    "Year" TEXT,
    "Load" DOUBLE PRECISION,
    "LoadConsumptionURL" TEXT,
    "setupStatus" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Consumer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transactions" (
    "id" SERIAL NOT NULL,
    "date" TEXT NOT NULL,
    "TimeSlot" INTEGER NOT NULL,
    "SellerId" TEXT NOT NULL,
    "BuyerId" TEXT NOT NULL,
    "Volume" DOUBLE PRECISION NOT NULL,
    "Price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SellOrderBook" (
    "id" SERIAL NOT NULL,
    "date" TEXT NOT NULL,
    "TimeSlot" INTEGER NOT NULL,
    "SellerId" TEXT NOT NULL,
    "Volume" DOUBLE PRECISION NOT NULL,
    "Price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "SellOrderBook_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BuyOrderBook" (
    "id" SERIAL NOT NULL,
    "date" TEXT NOT NULL,
    "TimeSlot" INTEGER NOT NULL,
    "BuyerId" TEXT NOT NULL,
    "Volume" DOUBLE PRECISION NOT NULL,
    "Price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "BuyOrderBook_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProsumerData" (
    "id" SERIAL NOT NULL,
    "prosumerId" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "TimeSlot" INTEGER NOT NULL,
    "Solargeneration" DOUBLE PRECISION NOT NULL,
    "netEnergy" DOUBLE PRECISION NOT NULL,
    "deviation" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ProsumerData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConsumerData" (
    "id" SERIAL NOT NULL,
    "consumerId" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "TimeSlot" INTEGER NOT NULL,
    "energyConsumption" DOUBLE PRECISION NOT NULL,
    "deviation" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ConsumerData_pkey" PRIMARY KEY ("id")
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
CREATE INDEX "Transactions_TimeSlot_idx" ON "Transactions"("TimeSlot");

-- CreateIndex
CREATE INDEX "SellOrderBook_Price_idx" ON "SellOrderBook"("Price");

-- CreateIndex
CREATE INDEX "SellOrderBook_TimeSlot_idx" ON "SellOrderBook"("TimeSlot");

-- CreateIndex
CREATE INDEX "BuyOrderBook_Price_idx" ON "BuyOrderBook"("Price");

-- CreateIndex
CREATE INDEX "BuyOrderBook_TimeSlot_idx" ON "BuyOrderBook"("TimeSlot");

-- CreateIndex
CREATE INDEX "ProsumerData_prosumerId_idx" ON "ProsumerData"("prosumerId");

-- CreateIndex
CREATE INDEX "ProsumerData_TimeSlot_idx" ON "ProsumerData"("TimeSlot");

-- CreateIndex
CREATE INDEX "ProsumerData_date_idx" ON "ProsumerData"("date");

-- CreateIndex
CREATE UNIQUE INDEX "ProsumerData_prosumerId_TimeSlot_date_key" ON "ProsumerData"("prosumerId", "TimeSlot", "date");

-- CreateIndex
CREATE INDEX "ConsumerData_consumerId_idx" ON "ConsumerData"("consumerId");

-- CreateIndex
CREATE INDEX "ConsumerData_TimeSlot_idx" ON "ConsumerData"("TimeSlot");

-- CreateIndex
CREATE INDEX "ConsumerData_date_idx" ON "ConsumerData"("date");

-- CreateIndex
CREATE UNIQUE INDEX "ConsumerData_consumerId_TimeSlot_date_key" ON "ConsumerData"("consumerId", "TimeSlot", "date");

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_SellerId_fkey" FOREIGN KEY ("SellerId") REFERENCES "Prosumer"("connectionId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_BuyerId_fkey" FOREIGN KEY ("BuyerId") REFERENCES "Consumer"("connectionId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SellOrderBook" ADD CONSTRAINT "SellOrderBook_SellerId_fkey" FOREIGN KEY ("SellerId") REFERENCES "Prosumer"("connectionId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BuyOrderBook" ADD CONSTRAINT "BuyOrderBook_BuyerId_fkey" FOREIGN KEY ("BuyerId") REFERENCES "Consumer"("connectionId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProsumerData" ADD CONSTRAINT "ProsumerData_prosumerId_fkey" FOREIGN KEY ("prosumerId") REFERENCES "Prosumer"("connectionId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsumerData" ADD CONSTRAINT "ConsumerData_consumerId_fkey" FOREIGN KEY ("consumerId") REFERENCES "Consumer"("connectionId") ON DELETE RESTRICT ON UPDATE CASCADE;
