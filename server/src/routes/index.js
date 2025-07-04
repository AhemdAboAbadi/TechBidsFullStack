const router = require('express').Router();

const {
  serverError,
  clientError,
  handleGetFilteredProducts,
  signIn,
  handleAddUser,
  handleAuthUser,
  logout,
  productDetails,
  handleGetTopGategories,
  getAuction,
  getUserProducts,
  handleGetGategories,
  addProduct,
  latestAuction,
  getUserWinBids,
  getUserEnteredBids,
} = require('../controllers');

const { isAuth } = require('../controllers/middlewares');

router.get('/auth/user', isAuth, handleAuthUser);
router.get('/user/products', isAuth, getUserProducts);
router.get('/user/win', isAuth, getUserWinBids);
router.get('/user/bids', isAuth, getUserEnteredBids);
router.post('/signIn', signIn);
router.post('/signup', handleAddUser);
router.get('/products', handleGetFilteredProducts);
router.post('/logout', logout);
router.get('/product/:id', productDetails);
router.get('/product/:id/history', getAuction);
router.post('/products', isAuth, addProduct);
router.get('/categories/top', handleGetTopGategories);
router.get('/categories', handleGetGategories);
router.get('/product/:id/history', getAuction);
router.get('/latest/auction', latestAuction);

router.use(clientError);
router.use(serverError);

module.exports = router;
