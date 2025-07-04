const Joi = require('joi');

module.exports = Joi.object({
  name: Joi.string().required(),
  category_id: Joi.number().required(),
  auc_amount: Joi.number().required(),
  auc_inc_amount: Joi.number().required(),
  end_date: Joi.date().required(),
  image: Joi.string().required(),
  description: Joi.string().required(),
  is_used: Joi.boolean(),
});
