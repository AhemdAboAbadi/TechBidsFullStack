const { Product, User } = require('../../models/index');
const boomify = require('../../utils/index');

const productDetails = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (id <= 0) { throw boomify(400, 'Bad Request', 'Bad Request'); }
    const data = await Product.findByPk(id, { include: { model: User, as: 'user' } });
    res.json({
      data,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { productDetails };
