import { STATUS_CODE } from '../../../constants';
import changeAvatarService from '../../../services/image/change-avatar.service';
import { ControllerType, UidType } from '../../controller-type';

const changeAvatar: ControllerType = async (req, res) => {
  const { uid }: UidType = res.locals.user;

  if (!req.file) {
    res.sendStatus(STATUS_CODE.BAD_REQUEST);
    return;
  }

  try {
    const changedAvatar = await changeAvatarService(
      uid as string,
      req.file.path,
      req.body.publicId,
    );

    res.status(STATUS_CODE.OK).json(changedAvatar);
  } catch (error) {
    res.sendStatus(STATUS_CODE.INTERNAL_SERVER_ERROR);
  }
};

export default changeAvatar;
