const { Contact, joiSchema, favoriteJoiSchema } = require("./contacts");
const { User, registerSchema, loginSchema } = require("./user");

module.exports = {
  Contact,
  joiSchema,
  favoriteJoiSchema,
  User,
  registerSchema,
  loginSchema,
};
