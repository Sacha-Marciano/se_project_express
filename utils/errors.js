module.exports.returnError = (err, res) => {
  console.error(err.name);
  if (err.name === "ValidationError" || err.name === "CastError") {
    return res.status(400).send({ message: err.message });
  }
  if (err.name === "DocumentNotFoundError") {
    return res.status(404).send({ message: err.message });
  }
  return res
    .status(500)
    .send({ message: "An error has occurred on the server." });
};
