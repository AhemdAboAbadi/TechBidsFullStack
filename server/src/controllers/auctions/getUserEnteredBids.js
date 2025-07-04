const { Auction, Product } = require('../../models');
const boomify = require('../../utils');

const getUserEnteredBids = async (req, res, next) => {
  const userId = req.user.id;

  try {
    if (userId <= 0) { throw boomify(400, 'Bad Request', 'Bad Request'); }
    const data = await Product.findAll({
      include: [{
        model: Auction,
        as: 'auction',
        where: {
          user_id: userId,
        },
      }],
    });
    res.json({ data });
  } catch (err) {
    next(err);
  }
};

module.exports = { getUserEnteredBids };
