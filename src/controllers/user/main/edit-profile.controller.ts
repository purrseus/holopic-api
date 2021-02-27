import editUserProfileService from '../../../services/user/edit-user-profile.service';
import { STATUS_CODE } from '../../../constants/index';
import { ControllerType, UidType } from '../../../controllers/controller-type';
import IUser from '../../../models/user/types';

const editProfile: ControllerType = async (req, res) => {
  const { uid }: UidType = res.locals.user;

  try {
    const updatedUser: IUser | null = await editUserProfileService(
      uid as string,
      req.body,
    );

    if (!updatedUser) {
      res
        .status(STATUS_CODE.CONFLICT)
        .json({ message: 'username already taken' });
      return;
    }

    res.status(STATUS_CODE.OK).json(updatedUser);
  } catch (error) {
    res.sendStatus(STATUS_CODE.INTERNAL_SERVER_ERROR);
  }
};

export default editProfile;
