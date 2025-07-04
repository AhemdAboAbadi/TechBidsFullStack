const { Category, Product } = require('../../models');
const { sequelize } = require('../../config/connection');

module.exports = async (req, res, next) => {
  try {
    const categoriesData = await Category.findAll({
      limit: 4,
      attributes: ['id', 'name', 'image', [sequelize.fn('COUNT', sequelize.col('products.category_id')), 'productCount']],
      include: [{
        model: Product,
        as: 'products',
        attributes: [],
        duplicating: false,
      }],
      group: ['products.category_id', 'categories.id'],
      order: [[sequelize.col('id')]],
    });
    res.json({ categoriesData });
  } catch (err) {
    next(err);
  }
};
