const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const path = require("path");

// Load the .env file from the current directory
dotenv.config({ path: path.resolve(__dirname, "../../.env") });
const authMiddleware = (req, res, next) => {
  const header = req.headers["authorization"];
  if (header) {
    const token = header.split(" ")[1];

    try {
      const decodedData = Object(jwt.verify(token, process.env.SECRET_KEY)); //a sync function

      req.connectionId = decodedData.userId;
      req.accountType = decodedData.accType;

      next();
    } catch (err) {
      res.status(401).json({
        message: "Invalid jwt token, please try logging in again.",
        err: err,
      });
      return;
    }
  } else {
    res.status(401).json({ message: "No access token." });
    return;
  }
};
process.on("uncaughtException", (err) => {
  console.error("Uncaught exception:", err);
  // You can also send a response here, e.g.
  // res.status(500).json({ message: 'Internal Server Error' });
});
module.exports = {
  authMiddleware,
};
