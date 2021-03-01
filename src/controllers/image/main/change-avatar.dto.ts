import { STATUS_CODE } from '../../../constants';
import { IAvatar } from '../../../models/user/types';
import changeAvatarService from '../../../services/image/change-avatar.service';
import { ControllerType, UidType } from '../../types';

const changeAvatar: ControllerType = async (req, res) => {
  const { uid }: UidType = res.locals.user;
  const { publicId } = req.body;

  if (!req.file) {
    res.sendStatus(STATUS_CODE.BAD_REQUEST);
    return;
  }

  try {
    const changedAvatar: IAvatar | null = await changeAvatarService(
      uid as string,
      req.file.path,
      publicId,
    );

    res.status(STATUS_CODE.OK).json(changedAvatar);
  } catch (error) {
    res.sendStatus(STATUS_CODE.INTERNAL_SERVER_ERROR);
  }
};

export default changeAvatar;
