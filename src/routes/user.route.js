const { Router } = require('express');
const { celebrate } = require('celebrate');
const router = Router();

const editProfileDto = require('../dto/user/edit-profile.dto');
const uidDto = require('../dto/user/uid.dto');
const pageDto = require('../dto/user/page.dto');
const searchUserDto = require('../dto/user/search-user.dto');

const getUser = require('../controllers/user/search/get-user.controller');
const searchUser = require('../controllers/user/search/search-users.controller');
const editProfile = require('../controllers/user/main/edit-profile.controller');
const getMyAccount = require('../controllers/user/main/get-my-account.controller');
const follow = require('../controllers/user/follow/follow.controller');
const unfollow = require('../controllers/user/follow/unfollow.controller');
const getFollowers = require('../controllers/user/follow/get-followers.controller');
const getFollowing = require('../controllers/user/follow/get-following.controller');

router.get('/my-account', getMyAccount);
router.patch('/edit-profile', celebrate(editProfileDto), editProfile);

router.get('/follow/:uid', celebrate(uidDto), follow);
router.get('/unfollow/:uid', celebrate(uidDto), unfollow);
router.get('/get-followers', celebrate(pageDto), getFollowers);
router.get('/get-following', celebrate(pageDto), getFollowing);

router.get('/search', celebrate(searchUserDto), searchUser);
router.get('/:uid/', celebrate(uidDto), getUser);

module.exports = router;
