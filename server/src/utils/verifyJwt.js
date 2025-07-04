const { verify } = require('jsonwebtoken');

const verifyTokenPromise = (myToken) => new Promise((resolve, reject) => {
  verify(myToken, process.env.SECRET_KEY, (error, decoded) => {
    if (error) {
      reject(error);
    } else {
      resolve(decoded);
    }
  });
});

module.exports = { verifyTokenPromise };
