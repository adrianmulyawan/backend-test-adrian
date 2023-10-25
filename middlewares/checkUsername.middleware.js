const Models = require('../database/db/models');
const User = Models.User;

const checkUsernameUser = async (req, res, next) => {
  try {
    const { username } = req.body;

    const isDuplicate = await User.findOne({
      where: {
        username
      }
    });

    if (isDuplicate) {
      return res.status(400).json({
        status: 'Failed',
        statusCode: 400,
        message: 'Username is Already Use!'
      });
    }

    next();

  } catch (error) {
    return res.status(400).json({
      status: 'Failed',
      statusCode: 400,
      message: 'Something Error in checkUsername Middleware!',
      error: error.message
    });
  }
}

module.exports = {
  checkUsernameUser
};