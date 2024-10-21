// Import hash encryption
const bcrypt = require("bcryptjs");

// Import token handler and signature key
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");

// Import schema and error checking function
const users = require("../models/users");
const { returnError, BAD_REQUEST } = require("../utils/errors");

// Add new user (request body) to users collection
module.exports.createUser = (req, res) => {
  const { name, avatar, email } = req.body;
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => users.create({ name, avatar, email, password: hash }))
    .then((user) => {
      res.status(201).send({
        _id: user._id,
        name: user.name,
        avatar: user.avatar,
        email: user.email,
      });
    })
    .catch((err) => {
      returnError(err, res);
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(BAD_REQUEST)
      .send({ message: "Email and password are required" });
  }
  return users
    .findUserByCredentials(email, password)
    .then((user) => {
      res.send({
        token: jwt.sign({ _id: user.id }, JWT_SECRET, { expiresIn: "7d" }),
      });
    })
    .catch((err) => {
      returnError(err, res);
    });
};

module.exports.getCurrentUser = (req, res) => {
  users
    .findById(req.user._id)
    .then((user) => {
      res.send({ user });
    })
    .catch((err) => {
      returnError(err, res);
    });
};

module.exports.updateCurrentUser = (req, res) => {
  const { name, avatar } = req.body;
  users
    .findByIdAndUpdate(
      req.user._id,
      { name, avatar },
      { new: true, runValidators: true },
    )
    .orFail()
    .then((newUser) => {
      res.send({ newUser });
    })
    .catch((err) => {
      returnError(err, res);
    });
};
