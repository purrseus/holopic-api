import { STATUS_CODE } from '../../../constants';
import likeImageService from '../../../services/image/like-image.service';
import { ControllerType, UidType } from '../../controller-type';

const like: ControllerType = async (req, res) => {
  const { uid }: UidType = res.locals.user;
  const { imageId } = req.params;

  try {
    const like: boolean = await likeImageService(uid as string, imageId);

    if (!like) {
      res.sendStatus(STATUS_CODE.BAD_REQUEST);
      return;
    }

    res.sendStatus(STATUS_CODE.OK);
  } catch (error) {
    res.sendStatus(STATUS_CODE.INTERNAL_SERVER_ERROR);
  }
};

export default like;
