const Joi = require('joi');

module.exports = Joi.object({
  search: Joi.string(),
  minPrice: Joi.number(),
  maxPrice: Joi.number(),
  categoryId: Joi.number().integer(),
  isOpen: Joi.boolean(),
  page: Joi.number().integer().required(),
});
