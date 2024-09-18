const express = require("express");
const bcrypt = require("bcrypt");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@shakti/db/client");
const { authMiddleware } = require("@shakti/middlewares/authmiddleware");
const dotenv = require("dotenv");
const path = require("path");

let prisma;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

// Load the .env file from the current directory
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

// Log the environment variables to check if they're loaded
console.log(process.env);

const PORT = process.env.PORT;
const SECRET_KEY = process.env.SECRET_KEY;
//for signing the jwt token
const app = express();
const twilio = require("twilio");

const { matcher, formatDate } = require("@shakti/utils/matchingAlgorithm");
const {
  Client,
  PrivateKey,
  AccountCreateTransaction,
  AccountBalanceQuery,
  Hbar,
  TransferTransaction,
  AccountId,
} = require("@hashgraph/sdk");
const {
  discomauthmiddleware,
} = require("@shakti/middlewares/discomauthmiddleware");
const { timeslotConvert } = require("@shakti/constants/discomConstants");
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

// Check if the required environment variables are set
if (!accountSid || !authToken) {
  console.error("Twilio credentials are missing. Please check your .env file.");
  process.exit(1);
}

const client = twilio(accountSid, authToken);
console.log("Connected to the DB");
let otpStore = {};
//define the interfaces
let client1;
//add the necessary middlewares
const allowedorigin = [
  process.env.FRONTEND_ORIGIN,
  process.env.DISCOM_FRONTEND_ORIGIN,
];
const corsOptions = {
  origin: allowedorigin,
  credentials: true, // Allow credentials (cookies, etc.)
};
app.use(cors(corsOptions));
// app.use(cors());
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.status(200).send({ message: "hello to shakti server" });
});
// const clientInit = async () => {
//   const myAccountId = process.env.MY_ACCOUNT_ID;
//   const myPrivateKey = process.env.MY_PRIVATE_KEY;
//   console.log("client init started");
//   // If we weren't able to grab it, we should throw a new error
//   if (!myAccountId || !myPrivateKey) {
//     throw new Error(
//       "Environment variables MY_ACCOUNT_ID and MY_PRIVATE_KEY must be present"
//     );
//   }

//   //Create your Hedera Testnet client
//   client1 = Client.forTestnet();

//   //Set your account as the client's operator
//   client1.setOperator(myAccountId, myPrivateKey);
//   console.log(client1);
//   //Set the default maximum transaction fee (in Hbar)
// };
// clientInit();
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
app.get("/startmatcher", authMiddleware, async (req, res) => {
  try {
    matcher(client1, process.env.MY_ACCOUNT_ID);
    res.status(200).send({ message: "matching successful" });
  } catch (err) {
    console.log(err);
    res.status(401).send({ message: err });
  }
});
app.get("/getUserEnergyRealtimedata", authMiddleware, async (req, res) => {
  const connectionId = req.connectionId;
  const accountType = req.accountType;
  const date = new Date();
  date.setDate(date.getDate() + 1);
  // console.log(date);
  const dateString = formatDate(date);
  if ((accountType = "prosumer")) {
    try {
      const userData = await prisma.prosumerData.findMany({
        where: {
          prosumerId: connectionId,
          date: dateString,
        },
      });
      res.status(200).send({ data: userData });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: err });
    }
  } else if ((accountType = "consumer")) {
    try {
      const userData = await prisma.consumerData.findMany({
        where: {
          consumerId: connectionId,
          date: dateString,
        },
      });
      res.status(200).send({ data: userData });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: err });
    }
  }
});
app.post("/signup", async (req, res) => {
  const { PhoneNo, password, connectionId, otp, username, accountType } =
    req.body;
  const saltRounds = 10;
  console.log("hello");
  console.log(PhoneNo, password);

  //hashing the password using bcrypt js
  if (otp == otpStore[PhoneNo]) {
    let user;
    try {
      if (accountType == "prosumer") {
        user = await prisma.prosumer.findUnique({
          where: {
            phone: PhoneNo,
          },
        });
      } else if (accountType == "consumer") {
        user = await prisma.consumer.findUnique({
          where: {
            phone: PhoneNo,
          },
        });
      }
    } catch (err) {
      res.status(500).send({ message: err });
      console.log(err);
    }
    if (!!user) {
      console.log(user);
      res.status(401).send({ message: "user already exists" });
    } else {
      // const newAccountPrivateKey = PrivateKey.generateED25519();
      // const newAccountPublicKey = newAccountPrivateKey.publicKey;
      // console.log(newAccountPrivateKey);
      // //Create a new account with 1,000 tinybar starting balance
      // const newAccount = await new AccountCreateTransaction()
      //   .setKey(newAccountPublicKey)
      //   .setInitialBalance(Hbar.fromTinybars(50))
      //   .execute(client1);

      // // Get the new account ID
      // const getReceipt = await newAccount.getReceipt(client1);
      // const newAccountId = getReceipt.accountId;
      // const newAccountIdString = newAccountId.toString();

      // //Log the account ID
      // console.log("The new account ID is: " + newAccountId);

      // //Verify the account balance
      // const accountBalance = await new AccountBalanceQuery()
      //   .setAccountId(newAccountId)
      //   .execute(client1);

      // console.log(
      //   "The new account balance is: " +
      //     accountBalance.hbars.toTinybars() +
      //     " tinybar."
      // );

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

                // hederaAccountId: newAccountIdString,
              },
            });
          } else if (accountType == "consumer") {
            user = await prisma.consumer.create({
              data: {
                phone: PhoneNo,
                password: hashedPassword,
                connectionId: connectionId,
                username: username,

                // hederaAccountId: newAccountIdString,
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
    }
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
          SolarCapacity: parseFloat(solarCapacity),
          City: city,
          pincode: pincode,
          GPSLocation: gps,
          solarBrand: brand,
          Year: year,
          Load: parseFloat(connectedLoad),
          State: state,
          Tilt: parseFloat(tilt),
          Azimuth: parseFloat(azimuth),
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
          Demand: parseFloat(demand),
          Year: year,
          Load: parseFloat(connectedLoad),
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

      console.log({ status: setupStatusres.setupStatus });
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
  const connectionId = req.connectionId;
  const accountType = req.accountType;
  if (accountType == "prosumer") {
    try {
      const prosumer = await prisma.prosumer.findUnique({
        where: {
          connectionId: connectionId,
        },
      });
      res.status(200).json({ message: prosumer });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: err });
    }
  } else if (accountType == "consumer") {
    try {
      const consumer = await prisma.consumer.findUnique({
        where: {
          connectionId: connectionId,
        },
      });
      res.status(200).json({ message: consumer });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: err });
    }
  }
});
app.post("/placebid/dayahead", authMiddleware, (req, res) => {
  const connectionId = req.connectionId;
  const accountType = req.accountType;
  const { arr } = req.body;
  const date = new Date();
  date.setDate(date.getDate() + 1);
  const dateString = formatDate(date);
  if (accountType == "prosumer") {
    try {
      arr.map(async (item, index) => {
        const { timeslot, volume, price } = item;

        const bid = await prisma.sellOrderBook.create({
          data: {
            SellerId: connectionId,
            TimeSlot: timeslotConvert.indexOf(timeslot) + 1,
            Volume: volume,
            Price: price,
            date: dateString,
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
            TimeSlot: timeslotConvert.indexOf(timeslot) + 1,
            Volume: volume,
            Price: price,
            date: dateString,
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
  const date = new Date();
  date.setDate(date.getDate());

  const istDateString = formatDate(date);
  // const istDateString = "2024-08-06";
  try {
    if (accountType == "prosumer") {
      const transactions = await prisma.transactions.findMany({
        where: {
          SellerId: connectionId,
          date: istDateString,
        },
        select: {
          TimeSlot: true,
          Volume: true,
          Price: true,
        },
      });
      console.log(transactions);
      res.status(200).send({ transactions: transactions });
    } else if (accountType == "consumer") {
      const transactions = await prisma.transactions.findMany({
        where: {
          BuyerId: connectionId,
          date: istDateString,
        },
        select: {
          TimeSlot: true,
          Volume: true,
          Price: true,
        },
      });
      res.status(200).send({ transactions: transactions });
    }
  } catch (err) {
    res.status(500).send({ message: "server error" });
  }
});
app.get("/discom/signin", discomauthmiddleware, (req, res) => {
  res.status(200).send({ message: "success" });
});
app.get("/discom/getTransactions", discomauthmiddleware, async (req, res) => {
  const { connectionId, startDate, endDate } = req.query;
  console.log(connectionId, startDate, endDate);
  try {
    const transactions = await prisma.transactions.findMany({
      where: {
        OR: [
          { SellerId: connectionId, date: { gte: startDate, lte: endDate } },
          { BuyerId: connectionId, date: { gte: startDate, lte: endDate } },
        ],
      },
    });
    res.status(200).send({ message: transactions });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "server error" });
  }
});
app.get(
  "/discom/aggregated/solarproduction",
  discomauthmiddleware,
  async (req, res) => {
    const date = new Date();
    date.setDate(date.getDate());
    const istDateString = formatDate(date);
    try {
      const aggregateSolarProduction = await prisma.prosumerData.groupBy({
        by: ["TimeSlot"], // Group by TimeSlot
        where: {
          date: istDateString, // Filter by the given date
        },
        _sum: {
          Solargeneration: true, // Sum the Solargeneration for each TimeSlot
        },
      });
      const formattedResult = aggregateSolarProduction.map((item) => ({
        timeslot: item.TimeSlot,
        Solargeneration: item._sum.Solargeneration,
      }));
      res.status(200).send({ message: formattedResult });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: "server error" });
    }
  }
);
app.get(
  "/discom/aggregated/clearedschedule",
  discomauthmiddleware,
  async (req, res) => {
    const { date } = req.query;
    console.log(date);
    try {
      const aggregateClearedSchedule = await prisma.transactions.groupBy({
        by: ["TimeSlot", "Price"], // Group by TimeSlot
        where: {
          date: date, // Filter by the given date
        },
        _sum: {
          Volume: true,
        },
      });
      const formattedResult = aggregateClearedSchedule.map((item) => ({
        timeslot: item.TimeSlot,
        price: item.Price,
        volume: item._sum.Volume,
      }));
      res.status(200).send({ message: formattedResult });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: "server error" });
    }
    // Sum the ClearedSchedule for each TimeSlot
  }
);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
