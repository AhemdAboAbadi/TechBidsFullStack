const { Product } = require('../../models');

const latestAuction = async (req, res, next) => {
  try {
    const last3Auction = await Product.findAll({
      order: [['id', 'DESC']],
      limit: 3,
    });
    res.json({ last3Auction });
  } catch (err) {
    next(err);
  }
};

module.exports = { latestAuction };
