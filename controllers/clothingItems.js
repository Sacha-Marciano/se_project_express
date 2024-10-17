// Import schema and error checking function
const clothingItems = require("../models/clothingItems");
const { returnError } = require("../utils/errors");

// Return all items from clothingItems collection in database
module.exports.getItems = (req, res) => {
  clothingItems
    .find({})
    .then((data) => {
      res.send({ data });
    })
    .catch((err) => {
      returnError(err, res);
    });
};

// Add item (request body) to the collection
module.exports.createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  clothingItems
    .create({ name, weather, imageUrl, owner })
    .then((data) => {
      res.send({ data });
    })
    .catch((err) => {
      returnError(err, res);
    });
};

// Finds item's ID in request (.../items/:itemId) and removes from collection
module.exports.deleteItemById = (req, res) => {
  clothingItems
    .findByIdAndRemove(req.params.itemId)
    .orFail()
    .then((data) => {
      res.send({ data });
    })
    .catch((err) => {
      returnError(err, res);
    });
};

// Add user's ID to likes array of specified item's ID
module.exports.likeItemById = (req, res) => {
  clothingItems
    .findByIdAndUpdate(
      req.params.itemId,
      { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
      { new: true },
    )
    .orFail()
    .then((data) => {
      res.send({ data });
    })
    .catch((err) => {
      returnError(err, res);
    });
};

// Remove user's ID to likes array of specified item's ID
module.exports.dislikeItemById = (req, res) => {
  clothingItems
    .findByIdAndUpdate(
      req.params.itemId,
      { $pull: { likes: req.user._id } }, // remove _id from the array
      { new: true },
    )
    .orFail()
    .then((data) => {
      res.send({ data });
    })
    .catch((err) => {
      returnError(err, res);
    });
};
