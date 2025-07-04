const { signIn } = require('./signIn');
const handleAddUser = require('./addUser');
const handleAuthUser = require('./authUser');
const logout = require('./logout');

module.exports = {
  handleAddUser, signIn, handleAuthUser, logout,
};
