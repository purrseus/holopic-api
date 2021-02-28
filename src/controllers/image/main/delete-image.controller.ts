import deleteImageService from '../../../services/image/delete-image.service';
import { STATUS_CODE } from '../../../constants/index';
import { ControllerType, UidType } from '../../types';
import IImage from '../../../models/image/types';

const deleteImage: ControllerType = async (req, res) => {
  const { uid }: UidType = res.locals.user;
  const { imageId } = req.params;

  try {
    const deletedImage: IImage | null = await deleteImageService(
      uid as string,
      imageId as string,
    );
    if (!deletedImage) {
      res.sendStatus(STATUS_CODE.INTERNAL_SERVER_ERROR);
    }
    res.sendStatus(STATUS_CODE.OK);
  } catch (error) {
    res.sendStatus(STATUS_CODE.INTERNAL_SERVER_ERROR);
  }
};

export default deleteImage;
