const jwt = require("jsonwebtoken");
export const authMiddleware = (req, res, next) => {
  const header = req.headers["authorization"];
  if (header) {
    const token = header.split(" ")[1];

    try {
      const decodedData = Object(jwt.verify(token, process.env.SECRET_KEY)); //a sync function
      console.log(decodedData);
      req.connectionId = decodedData.userId;
      req.accountType = decodedData.accountType;
      next();
    } catch (err) {
      res.status(401).json({
        message: "Invalid jwt token, please try logging in again.",
        err: err,
      });
    }
  } else {
    res.status(401).json({ message: "No access token." });
  }
};
