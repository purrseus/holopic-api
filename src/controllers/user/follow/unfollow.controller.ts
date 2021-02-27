import unfollowUserService from '../../../services/user/unfollow.service';
import { STATUS_CODE } from '../../../constants/index';
import { ControllerType, UidType } from '../../../controllers/controller-type';

const unfollow: ControllerType = async (req, res) => {
  const { uid }: UidType = res.locals.user;
  const unfollowUid: string = req.params.uid;

  try {
    const unfollowed: boolean = await unfollowUserService(
      uid as string,
      unfollowUid,
    );

    if (!unfollowed) {
      res.sendStatus(STATUS_CODE.BAD_REQUEST);
      return;
    }

    res.sendStatus(STATUS_CODE.OK);
  } catch (error) {
    res.sendStatus(STATUS_CODE.INTERNAL_SERVER_ERROR);
  }
};

export default unfollow;
