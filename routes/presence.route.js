const express = require('express');
const router = express.Router();

const { checkToken } = require('../middlewares/checkUserToken.middleware');
const { clockIn, clockOut } = require('../controllers/presence.controller');

// router.get('/api/v1/presence', [ checkToken ], )
router.post('/api/v1/clockin', [checkToken], clockIn);
router.post('/api/v1/clockout', [checkToken], clockOut);

module.exports = router;