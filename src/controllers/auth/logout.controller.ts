import User from '../../models/user/user.model';
import { STATUS_CODE, UserStatus } from '../../constants/index';
import { ControllerType, UidType } from '../../controllers/controller-type';

const logout: ControllerType = async (req, res) => {
  const { uid }: UidType = res.locals.user;
  try {
    await User.updateOne({ uid }, { status: UserStatus.INACTIVE });
    res.sendStatus(STATUS_CODE.OK);
  } catch (error) {
    res.sendStatus(STATUS_CODE.INTERNAL_SERVER_ERROR);
  }
};

export default logout;
