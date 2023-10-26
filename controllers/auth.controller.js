const Models = require('../database/db/models');
const User = Models.User;
const Presence = Models.Presence;

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const saltRounds = process.env.SALT_ROUNDS;
const secretKey = process.env.SECRET_KEY;

const register = async (req, res) => {
  try {
    const { fullname, email, username, password } = req.body;

    if (!fullname || !email || !username || !password) {
      return res.status(400).json({
        status: 'Failed',
        statusCode: 400,
        message: "Email, Password, Username, and Full Name Can't be Empty!"
      });
    }

    const encryptPassword = await bcrypt.hash(password, +saltRounds);

    const createUser = await User.create({
      fullname,
      email,
      username,
      password: encryptPassword
    });

    return res.status(200).json({
      status: 'Success',
      statusCode: 200,
      message: 'Register Successfully!',
      data: createUser
    });

  } catch (error) {
    return res.status(400).json({
      status: 'Failed',
      statusCode: 400,
      message: 'Something Error in Register!',
      error: error.message
    });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        status: 'Failed',
        statusCode: 400,
        message: "Username and Password Can't be Empty!"
      });
    }

    const user = await User.findOne({
      where: {
        username
      }
    });

    if (!user) {
      return res.status(404).json({
        status: 'Failed',
        statusCode: 404,
        message: 'Username is Not Found!'
      });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(400).json({
        status: 'Failed',
        statusCode: 400,
        message: 'Wrong Password!'
      });
    } else {
      // # Create JWT
      const generateToken = jwt.sign({
        id: user.id,
        fullname: user.fullname,
        email: user.email,
        username: user.username
      }, secretKey, {
        expiresIn: '1h'
      });

      return res.status(200).json({
        status: 'Success',
        statusCode: 200,
        message: 'Login Successfully!',
        data: generateToken
      });
    }

  } catch (error) {
    return res.status(400).json({
      status: 'Failed',
      statusCode: 400,
      message: 'Something Error in Login!',
      error: error.message
    });
  }
};

const getUserLogin = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.user.username
      },
      attributes: {
        exclude: ['password']
      },
      include: [{
        model: Presence,
        as: 'presences'
      }]
    });

    if (!user) {
      return res.status(400).json({
        status: 'Failed',
        statusCode: 400,
        message: 'User Not Found!'
      });
    }

    return res.status(200).json({
      status: 'Success',
      statusCode: 200,
      message: 'Data User Found!',
      data: user
    });

  } catch (error) {
    return res.status(400).json({
      status: 'Failed',
      statusCode: 400,
      message: 'Something Error in getUserLogin!',
      error: error.message
    });
  }
}

module.exports = {
  register,
  login,
  getUserLogin
};