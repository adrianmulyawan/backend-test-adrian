const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.SECRET_KEY;

const checkToken = (req, res, next) => {
  try {
    const bearerToken = req.get('Authorization');
    const token = bearerToken.split(" ")[1];

    const verifyToken = jwt.verify(token, secretKey);

    req.user = verifyToken;

    next();

  } catch (error) {
    return res.status(401).json({
      status: 'Failed',
      statusCode: 401,
      message: 'Token Unauthorized!'
    });
  }
};

module.exports = {
  checkToken
};