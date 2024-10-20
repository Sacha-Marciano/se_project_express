// Import token handler and key signature
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { WRONG_CREDENTIALS } = require("../utils/errors");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res
      .status(WRONG_CREDENTIALS)
      .send({ message: "Authorization error" });
  }

  const token = authorization.replace("Bearer ", "");

  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res.status(WRONG_CREDENTIALS).send({ message: err.message });
  }

  req.user = payload;
  next();
};
