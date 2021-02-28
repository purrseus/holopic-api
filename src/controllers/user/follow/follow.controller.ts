import followUserService from '../../../services/user/follow.service';
import { STATUS_CODE } from '../../../constants/index';
import { ControllerType, UidType } from '../../types';

const follow: ControllerType = async (req, res) => {
  const { uid }: UidType = res.locals.user;
  const followUid: string = req.params.uid;

  try {
    const followed: boolean = await followUserService(uid as string, followUid);

    if (!followed) {
      res.sendStatus(STATUS_CODE.BAD_REQUEST);
      return;
    }

    res.sendStatus(STATUS_CODE.OK);
  } catch (error) {
    res.sendStatus(STATUS_CODE.INTERNAL_SERVER_ERROR);
  }
};

export default follow;
