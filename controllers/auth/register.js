const { User } = require("../../models");
const bcrypt = require("bcryptjs");
const { Conflict } = require("http-errors");

const register = async (req, res, next) => {
  const { email, password } = req.body;

  const hashPassword = await bcrypt.hash(password, 10);

  const user = await User.findOne({ email });

  if (user) {
    throw new Conflict(`${email} in use`);
  }

  const newUser = await User.create({ ...req.body, password: hashPassword });

  res.status(201).json({
    email: newUser.email,
    name: newUser.name,
  });
};

module.exports = register;
