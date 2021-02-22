const { Router } = require('express');
const router = Router();

const getUser = require('../controllers/user/search/get-user');
const searchUser = require('../controllers/user/search/search-users');
const editProfile = require('../controllers/user/main/edit-profile');
const getMyAccount = require('../controllers/user/main/get-my-account');
const follow = require('../controllers/user/follow/follow');
const unfollow = require('../controllers/user/follow/unfollow');
const getFollowers = require('../controllers/user/follow/get-followers');
const getFollowing = require('../controllers/user/follow/get-following');

router.get('/my-account', getMyAccount);
router.patch('/edit-profile', editProfile);
router.get('/follow/:uid', follow);
router.get('/unfollow/:uid', unfollow);
router.get('/get-followers', getFollowers);
router.get('/get-following', getFollowing);
router.get('/search', searchUser);
router.get('/:uid/', getUser);

module.exports = router;
