const router = require("express").Router();

// Import middlewares
const auth = require("../middlewares/auth");
const {
  validateCreateItem,
  validateItemId,
} = require("../middlewares/validation");

// Import controllers
const {
  getItems,
  createItem,
  deleteItemById,
  likeItemById,
  dislikeItemById,
} = require("../controllers/clothingItems");

router.get("/", getItems);

router.use(auth);
router.post("/", validateCreateItem, createItem);

router.delete("/:itemId", validateItemId, deleteItemById);

router.put("/:itemId/likes", validateItemId, likeItemById);
router.delete("/:itemId/likes", validateItemId, dislikeItemById);

module.exports = router;
