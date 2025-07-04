/* eslint-disable no-unused-vars */
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const { User } = require('../../models');
const { signInValidation } = require('../validations');

const { boomify, signTokenPromise } = require('../../utils');

const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    await signInValidation.validateAsync({ email, password });

    const userData = await User.findAll({
      where: {
        email: {
          [Op.eq]: email,
        },
      },
    });

    if (!userData.length) {
      throw boomify(401, 'Sign In Error', 'invalid email or password');
    }

    const compare = await bcrypt.compare(password, userData[0].dataValues.password);

    if (!compare) {
      throw (boomify(401, 'Login Error', 'wrong Password'));
    }

    const token = await signTokenPromise(userData[0].dataValues.id, userData[0].dataValues.name, 'false');
    res.status(201).cookie('token', token, { httpOnly: true, secure: true })
      .json({
        message: 'signed In Successfully',
        user: {
          id: userData[0].id,
          name: userData[0].name,
        },
      });
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(boomify(400, err.details[0].message, 'Bad Request'));
    } else {
      next(err);
    }
  }
};

module.exports = { signIn };
