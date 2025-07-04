const Joi = require('joi');

module.exports = Joi.object({
  name: Joi.string().alphanum().min(4).required(),
  email: Joi.string().email().required(),
  password: Joi.string().alphanum().min(6).required(),
  confirmPassword: Joi.ref('password'),
});
