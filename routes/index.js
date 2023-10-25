const express = require('express');
const router = express.Router();

const authRoute = require('./auth.route');
const presenceRoute = require('./presence.route');

router.get('/', (req, res) => {
  return res.status(200).json({
    status: 'Success',
    statusCode: 200,
    message: 'Hello World!'
  });
});

router.use(authRoute);
router.use(presenceRoute);

module.exports = router;