const Models = require('../database/db/models');
const User = Models.User;

const checkEmailUser = async (req, res, next) => {
  try {
    const { email } = req.body;

    const isDuplicate = await User.findOne({
      where: {
        email
      }
    });

    if (isDuplicate) {
      return res.status(400).json({
        status: 'Failed',
        statusCode: 400,
        message: 'Email is Already Use!'
      });
    }

    next();

  } catch (error) {
    return res.status(400).json({
      status: 'Failed',
      statusCode: 400,
      message: 'Something Error in checkEmail Middleware!',
      error: error.message
    });
  }
}

module.exports = {
  checkEmailUser
};