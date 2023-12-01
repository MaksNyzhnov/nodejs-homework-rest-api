const { User } = require("../../models");
const { sendEmail } = require("../../middlewares");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { Conflict } = require("http-errors");
const { nanoid } = require("nanoid");

const register = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    throw new Conflict(`${email} in use`);
  }
  const hashPassword = await bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const verificationCode = nanoid();

  const avatarURL = gravatar.url(email);
  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationCode,
  });

  const verificationData = {
    to: email,
    subject: `Verify Email`,
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationCode}">Click to verify email</a>`,
  };

  await sendEmail(verificationData);

  const resp = await User.create(newUser);

  res.status(201).json({
    email: newUser.email,
    name: newUser.name,
    subscription: newUser.subscription,
    avatarURL: newUser.avatarURL,
    resp,
  });
};

module.exports = register;
