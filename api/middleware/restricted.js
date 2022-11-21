const { JWT_SECRET } = require('../../envVariables.js/index');
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  /*
    IMPLEMENT
    1- On valid token in the Authorization header, call next.
    2- On missing token in the Authorization header,
      the response body should include a string exactly as follows: "token required".
    3- On invalid or expired token in the Authorization header,
      the response body should include a string exactly as follows: "token invalid".
  */
  const token = req.headers.authorization;
  if (!token) {
    return next({ status: 401, message: "token required" });
  }
  jwt.verify(token, JWT_SECRET || 'shh', (err, decoded) => {
    if (err) {
      return next({ status: 401, message: "token invalid" });
    }
    req.decodedJwt = decoded;
    next();
  });
};