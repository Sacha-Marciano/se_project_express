// Import schema and error checking function
const user = require("../models/users");
const { returnError } = require("../utils/errors");

// // Return all items from Users collection in database
module.exports.getAllUsers = (req, res) => {
  user
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
  user
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
  const { name, avatar } = req.body;
  user
    .create({ name, avatar })
    .then((data) => {
      res.send({ data });
    })
    .catch((err) => {
      returnError(err, res);
    });
};
