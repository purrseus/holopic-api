const { Router } = require('express');
const router = Router();

const verifyFirebaseToken = require('../middlewares/verify-firebase-token');
const verifyToken = require('../middlewares/verify-token');
const {
  refreshToken,
  loginWithPhoneNumber,
  logout,
} = require('../controllers/auth.controller');

router.post('/refresh-token', refreshToken);
router.post('/login/phone-number', verifyFirebaseToken, loginWithPhoneNumber);
router.patch('/logout', verifyToken, logout);

/* ==========================TEST============================== */
router.get('/', verifyToken, (req, res) => {
  res.json({ a: 'hello world!!!' });
});

module.exports = router;
