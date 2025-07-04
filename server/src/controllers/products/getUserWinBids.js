const { Product } = require('../../models');
const boomify = require('../../utils');

const getUserWinBids = async (req, res, next) => {
  const userId = req.user.id;

  try {
    if (userId <= 0) { throw boomify(400, 'Bad Request', 'Bad Request'); }
    const data = await Product.findAll({
      where: {
        winner_id: userId,
      },
    });
    res.json({ data });
  } catch (err) {
    next(err);
  }
};

module.exports = getUserWinBids;
