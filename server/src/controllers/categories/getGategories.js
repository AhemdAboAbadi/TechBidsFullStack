const { Category } = require('../../models');

module.exports = async (req, res, next) => {
  try {
    const categoriesData = await Category.findAll({
      attributes: ['id', 'name'],
    });
    res.json({ categoriesData });
  } catch (err) {
    next(err);
  }
};
