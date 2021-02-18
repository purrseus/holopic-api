const { Router } = require('express');
const router = Router();

const verifyFirebaseToken = require('../middlewares/verify-firebase-token');
const {
  refreshToken,
  loginWithPhoneNumber,
} = require('../controllers/auth.controller');

router.post('/refresh-token', refreshToken);
router.post('/login/phone-number', verifyFirebaseToken, loginWithPhoneNumber);

/* ==========================TEST============================== */
const verifyToken = require('../middlewares/verify-token');
router.get('/', verifyToken, (req, res) => {
  res.json({ a: 'hello world!!!' });
});

module.exports = router;
