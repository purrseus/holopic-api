const { Router } = require('express');
const { celebrate } = require('celebrate');
const router = Router();

const {
  refreshTokenDto,
  verifyFirebaseTokenDto,
} = require('../controllers/dto');

const verifyFirebaseToken = require('../middlewares/verify-firebase-token');
const verifyToken = require('../middlewares/verify-token');

const refreshToken = require('../controllers/auth/refresh-token');
const loginWithPhoneNumber = require('../controllers/auth/login-with-phone-number');
const logout = require('../controllers/auth/logout');

router.post('/refresh-token', celebrate(refreshTokenDto), refreshToken);
router.post(
  '/login/phone-number',
  celebrate(verifyFirebaseTokenDto),
  verifyFirebaseToken,
  loginWithPhoneNumber,
);
router.get('/logout', verifyToken, logout);

module.exports = router;
