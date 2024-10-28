// Import express router
const router = require("express").Router();

// Import specific routers
const clothingItemsRouter = require("./clothingItems");
const usersRouter = require("./users");

// Import controllers for signin/up
const { login, createUser } = require("../controllers/users");

// Import 404 error
const NotFoundError = require("../utils/errors/NotFoundError");

// Import middlewares
const {
  validateLogin,
  validateCreateUser,
} = require("../middlewares/validation");

// For known endpoints
router.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});
router.post("/signin", validateLogin, login);
router.post("/signup", validateCreateUser, createUser);
router.use("/items", clothingItemsRouter);
router.use("/users", usersRouter);

// For unknown routes
router.use((req, res, next) => {
  console.log(req);
  next(new NotFoundError("Invalid route"));
});

module.exports = router;
