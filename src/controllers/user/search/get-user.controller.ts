import findUserService from '../../../services/user/find-user.service';
import { STATUS_CODE } from '../../../constants/index';
import IUser from '../../../models/user/types';
import { ControllerType, UidType } from '../../types';

const getUser: ControllerType = async (req, res) => {
  const { uid: myUid }: UidType = res.locals.user;
  const uid: string = req.params.uid;

  try {
    const user: IUser | null = await findUserService(uid, myUid as string);

    !user
      ? res.status(STATUS_CODE.NOT_FOUND).json({ message: 'Not found' })
      : res.status(STATUS_CODE.OK).json(user);
  } catch (error) {
    console.log(error);
    res.sendStatus(STATUS_CODE.INTERNAL_SERVER_ERROR);
  }
};

export default getUser;
