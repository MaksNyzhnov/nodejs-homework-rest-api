const express = require("express");

const router = express.Router();

const { validation, ctrlWrapper, authenticate } = require("../../middlewares");

const { registerSchema, loginSchema } = require("../../models");

const ctrl = require("../../controllers/auth");

router.post(
  "/register",
  validation(registerSchema),
  ctrlWrapper(ctrl.register)
);

router.post("/login", validation(loginSchema), ctrlWrapper(ctrl.login));

router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent));

router.post("/logout", authenticate, ctrlWrapper(ctrl.logout));

module.exports = router;