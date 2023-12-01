const express = require("express");

const router = express.Router();
const {
  validation,
  ctrlWrapper,
  authenticate,
  upload,
} = require("../../middlewares");

const { registerSchema, loginSchema } = require("../../models");

const ctrl = require("../../controllers/auth");
const { emailSchema } = require("../../models/user");

router.post(
  "/register",
  validation(registerSchema),
  ctrlWrapper(ctrl.register)
);

router.post("/login", validation(loginSchema), ctrlWrapper(ctrl.login));

router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent));

router.post("/logout", authenticate, ctrlWrapper(ctrl.logout));

router.get("/verify/:verificationCode", ctrlWrapper(ctrl.verifyUser));

router.post("/verify", validation(emailSchema), ctrlWrapper(ctrl.resendVerify));

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router;
