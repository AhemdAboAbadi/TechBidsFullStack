const { sign } = require('jsonwebtoken');

const signTokenPromise = (id, name, isAuth) => new Promise((resolve, reject) => {
  sign({ id, name, isAuth }, process.env.SECRET_KEY, (error, token) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });
});

module.exports = { signTokenPromise };
