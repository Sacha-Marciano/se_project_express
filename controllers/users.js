// Import schema and error checking function
const users = require("../models/users");
const { returnError } = require("../utils/errors");

// Import hash encryption
const bcrypt = require("bcryptjs");

// Return all items from Users collection in database
module.exports.getAllUsers = (req, res) => {
  users
    .find({})
    .then((data) => {
      res.send({ data });
    })
    .catch((err) => {
      returnError(err, res);
    });
};

// Finds user's ID in request (.../users/:userId) and sends it as response
module.exports.getUserById = (req, res) => {
  users
    .findById(req.params.userId)
    .orFail()
    .then((data) => {
      res.send({ data });
    })
    .catch((err) => {
      returnError(err, res);
    });
};

// Add new user (request body) to users collection
module.exports.createUser = (req, res) => {
  const { name, avatar, email } = req.body;
  bcrypt
    .hash(req.body.password, 14)
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
};
