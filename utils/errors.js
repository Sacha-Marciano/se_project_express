const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const INTERNAL_ERROR = 500;
const DUPLICATE_ERROR = 409;
const WRONG_CREDENTIALS = 401;
const UNAUTHORIZED = 403;

const returnError = (err, res) => {
  console.error(err.name);
  if (err.name === "ValidationError" || err.name === "CastError") {
    return res.status(BAD_REQUEST).send({ message: err.message });
  }
  if (err.name === "DocumentNotFoundError") {
    return res.status(`${NOT_FOUND}`).send({ message: err.message });
  }
  if (err.name === "MongoServerError") {
    return res.status(`${DUPLICATE_ERROR}`).send({ message: err.message });
  }
  if (err.message === "Incorrect email or password") {
    return res.status(`${WRONG_CREDENTIALS}`).send({ message: err.message });
  }
  return res
    .status(INTERNAL_ERROR)
    .send({ message: "An error has occurred on the server." });
};

module.exports = {
  returnError,
  NOT_FOUND,
  WRONG_CREDENTIALS,
  UNAUTHORIZED,
  BAD_REQUEST,
};
