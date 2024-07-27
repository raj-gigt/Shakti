const jwt = require("jsonwebtoken");
const authMiddleware = (req, res, next) => {
  const header = req.headers["authorization"];
  if (header) {
    const token = header.split(" ")[1];

    try {
      const decodedData = Object(jwt.verify(token, process.env.SECRET_KEY)); //a sync function
      console.log(decodedData);
      req.connectionId = decodedData.userId;
      req.accountType = decodedData.accType;
      console.log(req.accountType);
      next();
      console.log("hello1");
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
