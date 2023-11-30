const { isValidObjectId } = require("mongoose");
const { BadRequest } = require("http-errors");

const isValidId = (req, res, next) => {
  const { id } = req.params;
  const isCorrectId = isValidObjectId(id);

  if (!isCorrectId) {
    const error = BadRequest(`${id} - is not correct id format`);
    next(error);
  }
  next();
};

module.exports = isValidId;
