const { Product } = require('../../models');
const boomify = require('../../utils');

const getUserProducts = async (req, res, next) => {
  const userId = req.user.id;

  try {
    if (userId <= 0) { throw boomify(400, 'Bad Request', 'Bad Request'); }
    const data = await Product.findAll({
      where: {
        user_id: userId,
      },
    });
    res.json({ data });
  } catch (err) {
    next(err);
  }
};

module.exports = getUserProducts;
