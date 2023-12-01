const { User } = require("../../models");
const { sendEmail } = require("../../middlewares");

const resendVerify = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    throw new Error(404, "User not found");
  }

  if (user.verify) {
    throw new Error(400, "user already verified");
  }

  const verificationData = {
    to: email,
    subject: `Verify Email`,
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${user.verificationCode}">Click to verify email</a>`,
  };

  await sendEmail(verificationData);
  res.json({
    message: "Verify email send",
  });
};

module.exports = resendVerify;
