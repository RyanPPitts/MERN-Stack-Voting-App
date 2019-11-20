const jwt = require("jsonwebtoken");

// make middleware to decode the token
// check headers for auth key.  This is where we are going to store the token
//  the token is going to be a string - split
//  Token is 'Bearer ljdfkljaddflkjdalfjd'
//  Use JWT to verify if its an actual token
//  no token provided send error message

module.exports = (req, res, next) => {
  if (req.headers["authorization"]) {
    const token = req.headers["authorization"].split(" ")[1];
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        // res.json({
        //   success: false,
        //   message: 'Failed to authenticate token',
        // });
        next(Error("Failed to authenticate token"));
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    // res.status(403).json({
    //   status: false,
    //   message: 'No token provided',
    // });

    next(Error("No token provided"));
  }
};
