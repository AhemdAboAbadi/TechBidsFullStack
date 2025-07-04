const logout = (req, res) => {
  res.clearCookie('token')
    .json({ message: 'logged out successfully' });
};

module.exports = logout;
