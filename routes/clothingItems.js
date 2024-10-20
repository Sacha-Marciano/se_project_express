const router = require("express").Router();

// Import authentication middleware
const auth = require("../middlewares/auth");

const {
  getItems,
  createItem,
  deleteItemById,
  likeItemById,
  dislikeItemById,
} = require("../controllers/clothingItems");

router.get("/", getItems);

router.use(auth);
router.post("/", createItem);

router.delete("/:itemId", deleteItemById);

router.put("/:itemId/likes", likeItemById);
router.delete("/:itemId/likes", dislikeItemById);

module.exports = router;
