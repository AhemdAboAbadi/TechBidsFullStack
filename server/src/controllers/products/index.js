const { productDetails } = require('./productDetails');
const handleGetFilteredProducts = require('./getFilteredProducts');
const { addProduct } = require('./addProduct');
const getUserProducts = require('./getUserProducts');
const getUserWinBids = require('./getUserWinBids');

module.exports = {
  productDetails, handleGetFilteredProducts, getUserProducts, getUserWinBids, addProduct,
};
