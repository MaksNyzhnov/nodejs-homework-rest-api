const { Contact } = require("../../models");
const { NotFound } = require("http-errors");

const removeById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);
  if (!result) {
    throw new NotFound();
  }
  res.json(result);
};

module.exports = removeById;
