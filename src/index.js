const express = require("express");
const bcrypt = require("bcrypt");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const { authMiddleware } = require("./middleware/authmiddleware");
const PORT = 3001;
const SECRET_KEY = process.env.SECRET_KEY; //for signing the jwt token
const app = express();
const prisma = new PrismaClient();
const twilio = require("twilio");

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);
console.log("Connected to the DB");
let otpStore = {};
//define the interfaces

//add the necessary middlewares
app.use(cors());
app.use(bodyParser.json());
app.post("/sendotp", async (req, res) => {
  const { PhoneNo } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000);

  otpStore[PhoneNo] = otp;
  const message = `Your shakti OTP is ${otp}`;
  console.log(PhoneNo);
  try {
    const messageCreate = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: `+91${PhoneNo}`,
    });

    console.log(message);
    res.status(200).send({ message: "OTP sent" });
  } catch (err) {
    res.status(500).send({ error: err });
  }
});
app.post("/signup", (req, res) => {
  const { PhoneNo, password, connectionId, otp, username, accountType } =
    req.body;
  const saltRounds = 10;
  console.log("hello");
  console.log(PhoneNo, password);

  //hashing the password using bcrypt js
  if (otp == otpStore[PhoneNo]) {
    bcrypt
      .hash(password, saltRounds)
      .then(async (hashedPassword) => {
        //create the user here.
        console.log("Password hashed successfully.");
        let user;
        if (accountType == "prosumer") {
          user = await prisma.prosumer.create({
            data: {
              phone: PhoneNo,
              password: hashedPassword,
              connectionId: connectionId,
              username: username,
            },
          });
        } else if (accountType == "consumer") {
          user = await prisma.consumer.create({
            data: {
              phone: PhoneNo,
              password: hashedPassword,
              connectionId: connectionId,
              username: username,
            },
          });
        }
        if (user) {
          const token = jwt.sign(
            { userId: user.connectionId, accType: accountType },
            SECRET_KEY
          );
          res.status(200).json({
            message: "User created successfully.",
            token: token,
            accountType: accountType,
          });
          otpStore[PhoneNo] = null;
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Server error: " + err }); //this here would basically return an error if the username is already taken. or for any other error, the error will be sent to the frontend.
      });
  } else {
    res.status(401).json({ message: "incorrect otp" });
  }
});
app.post("/signin", async (req, res) => {
  const { PhoneNo, password, connectionId, accountType } = req.body;
  console.log(PhoneNo, password, connectionId, accountType);
  //check if the user exists on the DB,if exists retreive it and compare the password
  let user;
  if (accountType == "prosumer") {
    user = await prisma.prosumer.findUnique({
      where: {
        phone: PhoneNo,
        connectionId: connectionId,
      },
    });
  } else if (accountType == "consumer") {
    user = await prisma.consumer.findUnique({
      where: {
        phone: PhoneNo,
        connectionId: connectionId,
      },
    });
  }
  if (user) {
    //if user exists, log him in
    const hashedPassword = user.password;
    bcrypt
      .compare(password, hashedPassword) //hashedPassword will be retreived from the database.
      .then((result) => {
        if (result) {
          //now send the token to the client and make it store in the localstorage.
          const token = jwt.sign(
            { userId: user.connectionId, accType: accountType },
            SECRET_KEY
          );
          res.status(200).json({ token: token, message: "Login successful" });
        } else {
          console.log("galat");
          res.status(401).json({ message: "Invalid credentials" });
        }
      })
      .catch((err) => {
        res.status(500).json({ message: "Internal server error" });
      });
  } else {
    console.log("not found");
    res.status(401).json({ message: "No user found with the given username." });
  }
});
app.post("/setup", authMiddleware, async (req, res) => {
  const connectionId = req.connectionId;
  const accountType = req.accountType;
  console.log(accountType);
  if (accountType == "prosumer") {
    console.log("hello4");
    const {
      solarCapacity,
      city,
      pincode,
      gps,
      brand,
      year,
      connectedLoad,
      state,
      tilt,
      azimuth,
    } = req.body;
    console.log(
      solarCapacity,
      city,
      pincode,
      gps,
      brand,
      year,
      connectedLoad,
      tilt,
      azimuth
    );
    try {
      const prosumer = await prisma.prosumer.update({
        where: {
          connectionId: connectionId,
        },
        data: {
          SolarCapacity: solarCapacity,
          City: city,
          pincode: pincode,
          GPSLocation: gps,
          solarBrand: brand,
          Year: year,
          Load: connectedLoad,
          State: state,
          Tilt: parseInt(tilt),
          Azimuth: parseInt(azimuth),
          setupStatus: true,
        },
      });

      res.status(200).json({ message: "success" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    }
  } else if (accountType == "consumer") {
    const { city, pincode, year, connectedLoad, state, demand } = req.body;
    try {
      const consumer = await prisma.consumer.update({
        where: {
          connectionId: connectionId,
        },
        data: {
          City: city,
          pincode: pincode,
          State: state,
          Demand: demand,
          Year: year,
          Load: connectedLoad,
          setupStatus: true,
        },
      });
      res.status(200).json({ message: "success" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
});
app.get("/deleteUserdb", authMiddleware, async (req, res) => {
  const prosumerdb = await prisma.prosumer.deleteMany({});
  const consumerdb = await prisma.consumer.deleteMany({});

  res.status(200).send({ prosumerdb, consumerdb });
});
app.get("/setupstatus", authMiddleware, async (req, res) => {
  const connectionId = req.connectionId;
  const accountType = req.accountType;
  if (accountType == "prosumer") {
    try {
      const setupStatusres = await prisma.prosumer.findUnique({
        where: {
          connectionId: connectionId,
        },
      });
      res.status(200).json({ status: setupStatusres.setupStatus });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    }
  } else if (accountType == "consumer") {
    try {
      const setupStatusres = await prisma.consumer.findUnique({
        where: {
          connectionId: connectionId,
        },
      });
      res.status(200).json({ status: setupStatusres.setupStatus });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
});
app.get("/userData", authMiddleware, async (req, res) => {
  const prosumerData = await prisma.prosumer.findMany();
  const consumerData = await prisma.consumer.findMany();
  res.status(200).json({ prosumerData, consumerData });
});
app.post("/placebid/dayahead", authMiddleware, (req, res) => {
  const connectionId = req.connectionId;
  const accountType = req.accountType;
  const { arr } = req.body;
  const nextDay = new Date();
  nextDay.setDate(nextDay.getDate() + 1);
  if (accountType == "prosumer") {
    try {
      arr.map(async (item, index) => {
        const { timeslot, volume, price } = item;

        const bid = await prisma.sellOrderBook.create({
          data: {
            SellerId: connectionId,
            TimeSlot: timeslot,
            Volume: volume,
            Price: price,
            date: nextDay,
          },
        });
      });

      res.status(200).send({ message: "bid placed" });
      console.log("yayyy");
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: "server error" });
    }
  } else if (accountType == "consumer") {
    try {
      arr.map(async (item, index) => {
        const { timeslot, volume, price } = item;

        const bid = await prisma.buyOrderBook.create({
          data: {
            BuyerId: connectionId,
            TimeSlot: timeslot,
            Volume: volume,
            Price: price,
            date: nextDay,
          },
        });
      });
      res.status(200).send({ message: "bid placed" });
    } catch (err) {
      res.status(500).send({ message: "server error" });
    }
  }
});
app.get("/oiDbData", authMiddleware, async (req, res) => {
  const sellOi = await prisma.sellOrderBook.findMany();
  const buyOi = await prisma.buyOrderBook.findMany();
  res.status(200).send({ sellOi, buyOi });
});
app.get("/delOiData", authMiddleware, async (req, res) => {
  const sellOi = await prisma.sellOrderBook.deleteMany({});
  const buyOi = await prisma.buyOrderBook.deleteMany({});
  res.status(200).send({ sellOi, buyOi });
});
app.get("/getTransactions", authMiddleware, async (req, res) => {
  const connectionId = req.connectionId;
  const accountType = req.accountType;
  let transactions;
  try {
    if (accountType == "prosumer") {
      transactions = prisma.transactions.findMany({
        where: {
          SellerId: connectionId,
        },
      });
    } else if (accountType == "consumer") {
      const transactions = prisma.transactions.findMany({
        where: {
          BuyerId: connectionId,
        },
      });
    }
    res.status(200).send({ transactions });
  } catch (err) {
    res.status(500).send({ message: "server error" });
  }
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
