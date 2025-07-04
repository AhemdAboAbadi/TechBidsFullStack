const {
  User,
  Product,
  Category,
  Auction,
} = require('../models/index');
const { sequelize } = require('./connection');
const data = require('./data.json');

const build = async () => {
  try {
    await sequelize.sync({ force: true });
    await sequelize.truncate({ cascade: true });

    await Promise.all([
      ...data.categories.map((item) => Category.create(item)),
      ...data.users.map((item) => User.create(item)),
    ]);
    await Promise.all([
      ...data.products.map((item) => Product.create(item)),
    ]);
    await Promise.all([
      ...data.auctions.map((item) => Auction.create(item)),
    ]);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
};

if (process.env.NODE_ENV !== 'test') {
  build();
}

module.exports = { build };
