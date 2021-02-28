import findUsersService from '../../../services/user/find-users.service';
import { STATUS_CODE } from '../../../constants/index';
import { ControllerType, UidType } from '../../types';
import IUser from '../../../models/user/types';

const getFollowers: ControllerType = async (req, res) => {
  const { uid }: UidType = res.locals.user;
  const { page } = req.query;

  try {
    const users: IUser[] = await findUsersService(
      { 'profile.following': uid as string },
      uid as string,
      page as string,
    );
    res.status(STATUS_CODE.OK).json(users);
  } catch (error) {
    res.sendStatus(STATUS_CODE.INTERNAL_SERVER_ERROR);
  }
};

export default getFollowers;
