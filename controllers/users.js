const user = require("../models/users");
const { returnError } = require("../utils/errors");

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
