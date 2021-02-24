const { Router } = require('express');
const { celebrate } = require('celebrate');
const router = Router();

const refreshTokenDto = require('../dto/auth/refresh-token.dto');
const verifyFirebaseTokenDto = require('../dto/auth/verify-firebase-token.dto');

const verifyFirebaseToken = require('../middlewares/verify-firebase-token.middleware');
const verifyToken = require('../middlewares/verify-token.middleware');

const refreshToken = require('../controllers/auth/refresh-token.controller');
const loginWithPhoneNumber = require('../controllers/auth/login-with-phone-number.controller');
const logout = require('../controllers/auth/logout.controller');

router.post('/refresh-token', celebrate(refreshTokenDto), refreshToken);
router.post(
  '/login/phone-number',
  celebrate(verifyFirebaseTokenDto),
  verifyFirebaseToken,
  loginWithPhoneNumber,
);
router.get('/logout', verifyToken, logout);

module.exports = router;
