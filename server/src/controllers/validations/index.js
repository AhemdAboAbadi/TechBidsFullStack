const { signInValidation } = require('./signInValidation');
const signUpSchema = require('./singUpSchema');
const filterProductsSchema = require('./filterProductsSchema');
const addProductSchema = require('./addProductSchema');

module.exports = {
  signUpSchema, signInValidation, filterProductsSchema, addProductSchema,
};
