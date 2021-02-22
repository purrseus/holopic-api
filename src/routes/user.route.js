const { Router } = require('express');
const router = Router();

const verifyToken = require('../middlewares/verify-token');

const getUser = require('../controllers/user/search/get-user');
const searchUser = require('../controllers/user/search/search-users');
const editProfile = require('../controllers/user/main/edit-profile');
const getMyAccount = require('../controllers/user/main/get-my-account');
const follow = require('../controllers/user/follow/follow');
const unfollow = require('../controllers/user/follow/unfollow');

router.get('/my-account', verifyToken, getMyAccount);
router.patch('/edit-profile', verifyToken, editProfile);
router.get('/follow/:id', verifyToken, follow);
router.get('/unfollow/:id', verifyToken, unfollow);

router.get('/search', searchUser);
router.get('/:uid', getUser);

module.exports = router;
