const { Schema, model } = require("mongoose");

const handleErrors = require("../middlewares/validationErrors");

const Joi = require("joi");

const userSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 2,
      required: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: [true, "Password is required"],
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },

    avatarURL: {
      type: String,
      required: false,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationCode: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { virsionKey: false, timestamps: true }
);

userSchema.post("save", handleErrors);

const registerSchema = Joi.object({
  name: Joi.string().min(2).required().messages({
    "any.required": `Missing required name field`,
  }),
  email: Joi.string().email().required().messages({
    "any.required": `Missing required email field`,
  }),
  password: Joi.string().min(6).required().messages({
    "any.required": `Missing required password field`,
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": `Missing required email field`,
  }),
  password: Joi.string().min(6).required().messages({
    "any.required": `Missing required password field`,
  }),
});

const emailSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": `Missing required email field`,
  }),
});

const User = model("user", userSchema);
module.exports = {
  User,
  registerSchema,
  loginSchema,
  emailSchema,
};
