import { STATUS_CODE } from '../../../constants';
import unlikeImageService from '../../../services/image/unlike-image.service';
import { ControllerType, UidType } from '../../controller-type';

const unlike: ControllerType = async (req, res) => {
  const { uid }: UidType = res.locals.user;
  const { imageId } = req.params;

  try {
    const unlike: boolean = await unlikeImageService(uid as string, imageId);

    if (!unlike) {
      res.sendStatus(STATUS_CODE.BAD_REQUEST);
      return;
    }

    res.sendStatus(STATUS_CODE.OK);
  } catch (error) {
    res.sendStatus(STATUS_CODE.INTERNAL_SERVER_ERROR);
  }
};

export default unlike;
