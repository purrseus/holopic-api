import findUsersService from '../../../services/user/find-users.service';
import { STATUS_CODE } from '../../../constants/index';
import { ControllerType, UidType } from '../../types';
import IUser from '../../../models/user/types';

const searchUser: ControllerType = async (req, res) => {
  const { uid }: UidType = res.locals.user;
  const { q, page } = req.query;

  const regex: RegExp = new RegExp((q as string).replace(/[^\w\s]/g, ''), 'i');

  try {
    const users: IUser[] = await findUsersService(
      { 'profile.fullName': regex },
      uid as string,
      page as string,
    );

    res.status(STATUS_CODE.OK).json(users);
  } catch (error) {
    res.sendStatus(STATUS_CODE.INTERNAL_SERVER_ERROR);
  }
};

export default searchUser;
