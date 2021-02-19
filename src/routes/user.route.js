const { Router } = require('express');
const router = Router();

const verifyToken = require('../middlewares/verify-token');
const { getMyAccount, editProfile } = require('../controllers/user.controller');

router.get('/my-account', verifyToken, getMyAccount);

// search user

router.patch('/edit-profile', verifyToken, editProfile);

// delete user

module.exports = router;
