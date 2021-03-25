import { ImageStatus, STATUS_CODE } from '../../../constants';
import IImage from '../../../models/image/types';
import findImagesService from '../../../services/image/find-images.services';
import { ControllerType, UidType } from '../../types';

const getImageUser: ControllerType = async (req, res) => {
  const { uid }: UidType = res.locals.user;
  const { imageId } = req.params;

  try {
    const imagesUser: IImage[] = await findImagesService(uid as string, '1', {
      publicId: imageId,
      status: ImageStatus.UPLOADED,
    });

    if (!imagesUser.length) {
      res.sendStatus(STATUS_CODE.BAD_REQUEST);
      return;
    }
    res.status(STATUS_CODE.OK).json(imagesUser[0]);
  } catch (error) {
    res.sendStatus(STATUS_CODE.INTERNAL_SERVER_ERROR);
  }
};

export default getImageUser;
