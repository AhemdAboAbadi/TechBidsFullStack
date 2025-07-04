const joi = require('joi');

const signInValidation = joi.object({
  email: joi.string().email().required(),
  password: joi.string().alphanum().min(6).required(),
});

module.exports = { signInValidation };
