const { addProductSchema } = require('../validations');
const { boomify } = require('../../utils');
const { Product } = require('../../models');

const addProduct = async (req, res, next) => {
  try {
    const validatedData = await addProductSchema.validateAsync(req.body);

    const product = await Product.create({
      ...validatedData,
      user_id: req.user.id,
    });

    res.json({ message: 'Product Added Successfully !', status: 200, product });
  } catch (err) {
    if (err.details) {
      return next(boomify(422, 'Validation Error', err.details[0].message));
    }

    return next(err);
  }
};

module.exports = { addProduct };
