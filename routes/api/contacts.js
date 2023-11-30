const express = require("express");

const { validation, ctrlWrapper, isValidId } = require("../../middlewares");
const { joiSchema, favoriteJoiSchema } = require("../../models");
const ctrl = require("../../controllers/contacts");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));
router.get("/:id", isValidId, ctrlWrapper(ctrl.getById));
router.post("/", validation(joiSchema), ctrlWrapper(ctrl.add));
router.delete("/:id", isValidId, ctrlWrapper(ctrl.removeById));
router.put(
  "/:id",
  isValidId,
  validation(joiSchema),
  ctrlWrapper(ctrl.updateById)
);
router.patch(
  "/:id/favorite",
  isValidId,
  validation(favoriteJoiSchema),
  ctrlWrapper(ctrl.updateFavorite)
);

module.exports = router;
