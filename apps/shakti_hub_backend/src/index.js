const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@shakti/db/client");
const { authMiddleware } = require("@shakti/middlewares/authmiddleware");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: path.resolve(__dirname, "../../.env") });
const PORT = process.env.PORT_HUB;
const app = express();
const prisma = new PrismaClient();
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
app.use(bodyParser.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/publishUserData", authMiddleware, async (req, res) => {
  const connectionId = req.connectionId;
  const accountType = req.accountType;
  const date = new Date();
  const utcTime = date.getTime();

  const istDateString = formatDate(utcTime);
  // console.log(date);
  const dateString = formatDate(date);
  if (accountType == "prosumer") {
    try {
      const { timeslot, solarGeneration, Netenergy } = req.body;

      const allocation = await prisma.prosumer.findUnique({
        where: {
          connectionId: connectionId,
        },
        select: {
          connectionId: true,
          _sum: {
            Transactions: {
              where: {
                date: istDateString,
                TimeSlot: timeslot,
              },
              select: {
                Volume: true,
              },
            },
          },
        },
      });
      const totalVolume = allocation?._sum.Transactions.Volume || 0;

      const createUserData = await prisma.prosumerData.create({
        data: {
          TimeSlot: timeslot,
          Solargeneration: solarGeneration,
          netEnergy: Netenergy,
          date: istDateString,
          prosumerId: connectionId,
          deviation: Netenergy - totalVolume,
        },
      });

      res.status(200).send({ message: "data created" });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: "Error creating data" });
    }
  }
  if (accountType == "consumer") {
    try {
      const { timeslot, energyConsumption } = req.body;
      const allocation = await prisma.consumer.findUnique({
        where: {
          connectionId: connectionId,
        },
        select: {
          connectionId: true,
          _sum: {
            Transactions: {
              where: {
                date: istDateString,
                TimeSlot: timeslot,
              },
              select: {
                Volume: true,
              },
            },
          },
        },
      });
      const totalVolume = allocation?._sum.Transactions.Volume || 0;
      const createUserData = await prisma.consumerData.create({
        data: {
          TimeSlot: timeslot,
          energyConsumption: energyConsumption,
          date: istDateString,
          consumerId: connectionId,
          deviation: energyConsumption - totalVolume,
        },
      });
      res.status(200).send({ message: "data created" });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: "Error creating data" });
    }
  }
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
