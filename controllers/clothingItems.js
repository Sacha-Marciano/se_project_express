// Import mongoose for ObjectId
const mongoose = require("mongoose");

// Import schema and customized errors
const clothingItems = require("../models/clothingItems");
const BadRequestError = require("../utils/errors/BadRequestError");
const ForbiddenError = require("../utils/errors/ForbiddenError");
const NotFoundError = require("../utils/errors/NotFoundError");

// Import regex for ID validation
const { idRegex } = require("../utils/config");

// Return all items from clothingItems collection in database
module.exports.getItems = (req, res, next) => {
  clothingItems
    .find({})
    .then((data) => {
      res.send(data);
    })
    .catch(next);
};

// Add item (request body) to the collection
module.exports.createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  clothingItems
    .create({ name, weather, imageUrl, owner })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("Data is not valid"));
      } else {
        next(err);
      }
    });
};

// Finds item's ID in request (.../items/:itemId) and removes from collection depending on owner ID
module.exports.deleteItemById = (req, res, next) => {
  if (!idRegex.test(req.params.itemId)) {
    throw new BadRequestError("Invalid ID");
  }
  return clothingItems
    .findById(req.params.itemId)
    .orFail()
    .then((item) => {
      const userId = JSON.stringify(new mongoose.Types.ObjectId(req.user._id));
      const ownerId = JSON.stringify(item.owner);
      if (ownerId !== userId) {
        throw new ForbiddenError("This user is not the owner of the item");
      }

      return clothingItems
        .findByIdAndRemove(req.params.itemId)
        .orFail()
        .then((data) => {
          res.send(data);
        });
    })
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("Data not found"));
      } else if (err.name === "CastError") {
        next(new BadRequestError("Invalid data"));
      } else {
        next(err);
      }
    });
};

// Add user's ID to likes array of specified item's ID
module.exports.likeItemById = (req, res, next) => {
  clothingItems
    .findByIdAndUpdate(
      req.params.itemId,
      { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
      { new: true },
    )
    .orFail()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("Data not found"));
      } else if (err.name === "CastError") {
        next(new BadRequestError("Invalid data"));
      } else {
        next(err);
      }
    });
};

// Remove user's ID to likes array of specified item's ID
module.exports.dislikeItemById = (req, res, next) => {
  clothingItems
    .findByIdAndUpdate(
      req.params.itemId,
      { $pull: { likes: req.user._id } }, // remove _id from the array
      { new: true },
    )
    .orFail()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("Data not found"));
      } else if (err.name === "CastError") {
        next(new BadRequestError("Invalid data"));
      } else {
        next(err);
      }
    });
};
