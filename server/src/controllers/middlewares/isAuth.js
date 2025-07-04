const { verifyTokenPromise } = require('../../utils');
const { boomify } = require('../../utils/index');

const isAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (token) {
      const userToken = await verifyTokenPromise(token);
      req.user = userToken;
      return next();
    }
    throw boomify(401, 'Unauthorized', 'You need to login or sign up');
  } catch (err) {
    return next(err);
  }
};

module.exports = { isAuth };
