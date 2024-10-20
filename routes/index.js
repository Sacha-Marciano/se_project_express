// Import express router
const router = require("express").Router();

// Import specific routers
const clothingItemsRouter = require("./clothingItems");
const usersRouter = require("./users");

// Import controllers for signin/up
const { login, createUser } = require("../controllers/users");

// Import 404 error
const { NOT_FOUND } = require("../utils/errors");

// For known endpoints
router.post("/signin", login);
router.post("/signup", createUser);
router.use("/items", clothingItemsRouter);
router.use("/users", usersRouter);

// For unknown routes
router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Bad route request" });
});

module.exports = router;
