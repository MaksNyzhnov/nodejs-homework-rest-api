const { Schema, model } = require("mongoose");
const { handleErrors } = require("../middlewares");
const joi = require("joi");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 2,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Set email for contact"],
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleErrors);

const joiSchema = joi.object({
  name: joi.string().min(2).required().messages({
    "any.required": `Missing required name field`,
  }),
  email: joi.string().email().required().messages({
    "any.required": `Missing required email field`,
  }),
  phone: joi.string().required().messages({
    "any.required": `Missing required phone field`,
  }),
  favorite: joi.bool(),
});

const favoriteJoiSchema = joi.object({
  favorite: joi.bool().required().messages({
    "any.required": `Missing required bool field`,
  }),
});

const Contact = model("contact", contactSchema);

module.exports = { Contact, joiSchema, favoriteJoiSchema };
