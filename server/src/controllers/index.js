const { serverError, clientError } = require('./error');
const { signUpSchema } = require('./validations');
const { handleGetTopGategories, handleGetGategories } = require('./categories');
const {
  handleAddUser,
  signIn,
  handleAuthUser,
  logout,
} = require('./users');
const {
  handleGetFilteredProducts, productDetails, getUserProducts, getUserWinBids, addProduct,
} = require('./products');
const { getAuction, latestAuction, getUserEnteredBids } = require('./auctions');

module.exports = {
  serverError,
  clientError,
  signUpSchema,
  signIn,
  handleAddUser,
  productDetails,
  handleGetFilteredProducts,
  handleAuthUser,
  handleGetTopGategories,
  getAuction,
  logout,
  addProduct,
  getUserProducts,
  handleGetGategories,
  latestAuction,
  getUserWinBids,
  getUserEnteredBids,
};
