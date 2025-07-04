const Sequelize = require('sequelize');
const { sequelize } = require('../config/connection');

const Auction = sequelize.define('auctions', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  product_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
  amount: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },

}, {
  indexes: [
    {
      primaryKey: true,
      fields: ['id'],
    },
  ],
});

module.exports = { Auction };
