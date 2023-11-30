const { Contact } = require("../../models");
const { NotFound } = require("http-errors");

const updateById = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });

  if (!result) {
    throw new NotFound();
  }

  res.status(200).json(result);
};

module.exports = updateById;
