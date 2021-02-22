const { Router } = require('express');
const { celebrate } = require('celebrate');
const router = Router();

const {
  uidDto,
  pageDto,
  editProfileDto,
  searchUserDto,
} = require('../controllers/dto');

const getUser = require('../controllers/user/search/get-user');
const searchUser = require('../controllers/user/search/search-users');
const editProfile = require('../controllers/user/main/edit-profile');
const getMyAccount = require('../controllers/user/main/get-my-account');
const follow = require('../controllers/user/follow/follow');
const unfollow = require('../controllers/user/follow/unfollow');
const getFollowers = require('../controllers/user/follow/get-followers');
const getFollowing = require('../controllers/user/follow/get-following');

router.get('/my-account', getMyAccount);
router.patch('/edit-profile', celebrate(editProfileDto), editProfile);
router.get('/follow/:uid', celebrate(uidDto), follow);
router.get('/unfollow/:uid', celebrate(uidDto), unfollow);
router.get('/get-followers', celebrate(pageDto), getFollowers);
router.get('/get-following', celebrate(pageDto), getFollowing);
router.get('/search', celebrate(searchUserDto), searchUser);
router.get('/:uid/', celebrate(uidDto), getUser);

module.exports = router;
