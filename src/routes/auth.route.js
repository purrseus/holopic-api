const { Router } = require('express');
const router = Router();

const verifyFirebaseToken = require('../middlewares/verify-firebase-token');
const verifyToken = require('../middlewares/verify-token');

const refreshToken = require('../controllers/auth/refresh-token');
const loginWithPhoneNumber = require('../controllers/auth/login-with-phone-number');
const logout = require('../controllers/auth/logout');

router.post('/refresh-token', refreshToken);
router.post('/login/phone-number', verifyFirebaseToken, loginWithPhoneNumber);
router.get('/logout', verifyToken, logout);

module.exports = router;
