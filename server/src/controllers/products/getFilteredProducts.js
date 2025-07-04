const { Op } = require('sequelize');
const { Product } = require('../../models');
const { filterProductsSchema } = require('../validations');
const { boomify } = require('../../utils');
const { sequelize } = require('../../config/connection');

module.exports = async (req, res, next) => {
  try {
    const {
      search,
      minPrice = 0,
      maxPrice,
      categoryId,
      status,
      page = 1,
    } = req.query;

    let isOpen;
    if (status === 'open') {
      isOpen = true;
    } else if (status === 'ended') {
      isOpen = false;
    } else {
      isOpen = status;
    }

    await filterProductsSchema.validateAsync({
      search,
      minPrice,
      maxPrice,
      categoryId,
      isOpen,
      page,
    });

    const count = await Product.count({
      where: {
        [Op.and]: [
          search !== undefined && {
            [Op.or]: [
              {
                name: sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', `%${search.toLowerCase()}%`),
              },
              {
                description: sequelize.where(sequelize.fn('LOWER', sequelize.col('description')), 'LIKE', `%${search.toLowerCase()}%`),
              },
            ],
          },
          isOpen !== undefined && { is_open: isOpen },
          categoryId !== undefined && { category_id: categoryId },
          maxPrice !== undefined && {
            auc_amount: {
              [Op.lte]: maxPrice,
            },
          },
          {
            auc_amount: {
              [Op.gte]: minPrice,
            },
          },
        ],
      },
    });

    const productData = await Product.findAll({
      attributes: ['id', 'name', 'description', 'is_open', 'image', 'end_date', 'auc_amount'],
      offset: (page - 1) * 6,
      limit: 6,
      where: {
        [Op.and]: [
          search !== undefined && {
            [Op.or]: [
              {
                name: sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', `%${search.toLowerCase()}%`),
              },
              {
                description: sequelize.where(sequelize.fn('LOWER', sequelize.col('description')), 'LIKE', `%${search.toLowerCase()}%`),
              },
            ],
          },
          isOpen !== undefined && { is_open: isOpen },
          categoryId !== undefined && { category_id: categoryId },
          maxPrice !== undefined && {
            auc_amount: {
              [Op.lte]: maxPrice,
            },
          },
          {
            auc_amount: {
              [Op.gte]: minPrice,
            },
          },
        ],
      },
    });

    res.json({ productData, count });
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(boomify(400, err.details[0].message, 'Bad Request'));
    } else {
      next(err);
    }
  }
};
