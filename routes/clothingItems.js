const router = require("express").Router();

const {
  getItems,
  createItem,
  deleteItemById,
  likeItemById,
  dislikeItemById,
} = require("../controllers/clothingItems");

router.get("/", getItems);
router.post("/", createItem);

router.delete("/:itemId", deleteItemById);

router.put("/:itemId/likes", likeItemById);
router.delete("/:itemId/likes", dislikeItemById);

module.exports = router;
