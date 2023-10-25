const express = require('express');
const router = express.Router();

const { register, login, getUserLogin } = require('../controllers/auth.controller');
const { checkEmailUser } = require('../middlewares/checkEmail.middleware');
const { checkUsernameUser } = require('../middlewares/checkUsername.middleware');
const { checkToken } = require('../middlewares/checkUserToken.middleware');

router.post('/api/v1/register', [ checkEmailUser, checkUsernameUser ], register);
router.post('/api/v1/login', login);
router.get('/api/v1/userLogin', [ checkToken ], getUserLogin)

module.exports = router;