export const authMiddleware = (req, res, next) => {
  const header = req.headers["authorization"];
  if (header) {
    const token = header.split(" ")[1];
    //verify the token and call the next function to go the route further.
    try {
      //jwt.verify will throw an error if the token is not valid, which will be catched below.

      const decodedData = Object(jwt.verify(token, process.env.SECRET_KEY)); //a sync function
      // * Here we need to convert it into object to get access to the data else it returns a jwt payload type which cannot be accessed as a object.

      // it would be good if we pass the userId to the request further, so that we can use it in the routes.

      //set userId variable in req
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
