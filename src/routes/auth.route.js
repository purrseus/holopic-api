const { Router } = require('express');
const router = Router();

const verifyFirebaseToken = require('../middlewares/verify-firebase-token');
const {
  generateNewAccessToken,
  loginWithPhoneNumber,
} = require('../controllers/auth.controller');

router.post('/loginWithPhoneNumber', verifyFirebaseToken, loginWithPhoneNumber);
router.post('/newAccessToken', generateNewAccessToken);

module.exports = router;
