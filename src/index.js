const express = require("express");
const bcrypt = require("bcrypt");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
