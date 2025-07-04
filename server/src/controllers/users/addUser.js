const { Op } = require('sequelize');
const { hash } = require('bcrypt');
const { User } = require('../../models/user');
const { signUpSchema } = require('../validations');
const { signTokenPromise, boomify } = require('../../utils');

module.exports = async (req, res, next) => {
  try {
    const {
      name, email, password, confirmPassword,
    } = req.body;
    await signUpSchema.validateAsync({
      name, email, password, confirmPassword,
    });
    const { count } = await User.findAndCountAll({
      where: {
        email: {
          [Op.eq]: email,
        },
      },
    });
    if (!count) {
      const hashedPassword = await hash(password, 10);
      const userData = await User.create({ name, email, password: hashedPassword });
      const token = await signTokenPromise(userData.dataValues.id, name, 'false');
      res.status(201).cookie('token', token, { httpOnly: true, secure: true })
        .json({
          message: 'signed up successfully',
          user: {
            id: userData.dataValues.id,
            name: userData.dataValues.name,
          },
        });
    } else {
      throw boomify(409, 'exist email', 'This email is already connected to an account');
    }
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(boomify(400, err.details[0].message, 'Bad Request'));
    } else {
      next(err);
    }
  }
};
