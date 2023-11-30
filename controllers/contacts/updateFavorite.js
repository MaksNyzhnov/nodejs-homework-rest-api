const { Contact } = require("../../models");

const { NotFound } = require("http-errors");

const updateFavorite = async (req, res) => {
  const { id } = req.params;
  const { favorite } = req.body;

  const result = await Contact.findByIdAndUpdate(
    id,
    { favorite },
    { new: true }
  );

  if (!result) {
    throw new NotFound();
  }

  res.json(result);
};

module.exports = updateFavorite;
