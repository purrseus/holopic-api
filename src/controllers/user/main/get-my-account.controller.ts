import findAccountService from '../../../services/user/find-account.service';
import { STATUS_CODE } from '../../../constants/index';
import { ControllerType, UidType } from '../../types';
import { IAccount } from '../../../models/user/types';

const getMyAccount: ControllerType = async (req, res) => {
  const { uid }: UidType = res.locals.user;
  try {
    const user: IAccount | null = await findAccountService(uid as string);

    if (!user) {
      res.status(STATUS_CODE.NOT_FOUND).json({ message: 'Not found' });
      return;
    }

    res.status(STATUS_CODE.OK).json(user);
  } catch (error) {
    res.sendStatus(STATUS_CODE.INTERNAL_SERVER_ERROR);
  }
};

export default getMyAccount;
