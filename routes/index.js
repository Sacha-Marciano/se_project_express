// Import express router
const router = require("express").Router();

// Import specific routers
const userRouter = require("./users");
const clothingItemsRouter = require("./clothingItems");

// Import 404 error
const { NOT_FOUND } = require("../utils/errors");

// For known endpoints
router.use("/", userRouter);
router.use("/items", clothingItemsRouter);

// For unknown routes
router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Bad route request" });
});

module.exports = router;
