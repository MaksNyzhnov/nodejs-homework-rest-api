const { User } = require("../../models");

const verifyUser = async (req, res) => {
  const { verificationCode } = req.params;
  const user = await User.findOne({ verificationCode: verificationCode });
  if (!user) {
    throw new Error(400, "User not found");
  }
  await User.findByIdAndUpdate(user.id, {
    verificationCode: "",
    verify: true,
  });

  res.json({
    message: "User verify successfully",
  });
};

module.exports = verifyUser;
