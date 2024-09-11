const { discomCreds } = require("@shakti/constants/discomConstants");
const discomauthmiddleware = (req, res, next) => {
  const { username, password } = req.headers;
  console.log(username, password);
  try {
    if ((discomCreds[username] = password)) {
      next();
    } else {
      res.status(401).json({ message: "Invalid Credentials" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err });
  }
};

module.exports = {
  discomauthmiddleware,
};
