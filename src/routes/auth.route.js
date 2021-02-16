const { Router } = require('express');
const router = Router();

const { verifyFirebaseToken } = require('../middlewares/verify-firebase-token');

router.post('/loginWithPhoneNumber', verifyFirebaseToken, (req, res) => {
  console.log(res.locals.decodedIdToken);
});

module.exports = router;
