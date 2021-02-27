import { Router } from 'express';
import { celebrate } from 'celebrate';
const router: Router = Router();

import editProfileDto from '../dto/user/edit-profile.dto';
import uidDto from '../dto/user/uid.dto';
import pageDto from '../dto/page.dto';
import searchDto from '../dto/search.dto';

import getUser from '../controllers/user/search/get-user.controller';
import searchUser from '../controllers/user/search/search-users.controller';
import editProfile from '../controllers/user/main/edit-profile.controller';
import getMyAccount from '../controllers/user/main/get-my-account.controller';
import follow from '../controllers/user/follow/follow.controller';
import unfollow from '../controllers/user/follow/unfollow.controller';
import getFollowers from '../controllers/user/follow/get-followers.controller';
import getFollowing from '../controllers/user/follow/get-following.controller';

router.get('/my-account', getMyAccount);
router.patch('/edit-profile', celebrate(editProfileDto), editProfile);

router.get('/follow/:uid', celebrate(uidDto), follow);
router.get('/unfollow/:uid', celebrate(uidDto), unfollow);
router.get('/get-followers', celebrate(pageDto), getFollowers);
router.get('/get-following', celebrate(pageDto), getFollowing);

router.get('/search', celebrate(searchDto), searchUser);
router.get('/:uid', celebrate(uidDto), getUser);

export default router;
