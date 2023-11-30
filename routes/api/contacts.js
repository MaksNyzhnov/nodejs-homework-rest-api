const express = require("express");

const {
  validation,
  ctrlWrapper,
  isValidId,
  authenticate,
} = require("../../middlewares");
const { joiSchema, favoriteJoiSchema } = require("../../models");
const ctrl = require("../../controllers/contacts");

const router = express.Router();

router.get("/", authenticate, ctrlWrapper(ctrl.getAll));
router.get("/:id", authenticate, isValidId, ctrlWrapper(ctrl.getById));
router.post("/", authenticate, validation(joiSchema), ctrlWrapper(ctrl.add));
router.delete("/:id", authenticate, isValidId, ctrlWrapper(ctrl.removeById));
router.put(
  "/:id",
  authenticate,
  isValidId,
  validation(joiSchema),
  ctrlWrapper(ctrl.updateById)
);
router.patch(
  "/:id/favorite",
  authenticate,
  isValidId,
  validation(favoriteJoiSchema),
  ctrlWrapper(ctrl.updateFavorite)
);

module.exports = router;
