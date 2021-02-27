import editImageService from '../../../services/image/edit-image.service';
import { STATUS_CODE } from '../../../constants/index';
import { ControllerType, UidType } from '../../../controllers/controller-type';
import IImage from '../../../models/image/types';

const editImage: ControllerType = async (req, res) => {
  const { uid }: UidType = res.locals.user;
  const { imageId } = req.params;
  const { title, tags }: Pick<IImage, 'title' | 'tags'> = req.body;

  try {
    const editedImage: IImage | null = await editImageService(
      uid as string,
      imageId,
      title as string,
      tags as string[],
    );
    if (!editedImage) {
      res.sendStatus(STATUS_CODE.INTERNAL_SERVER_ERROR);
    }
    res.sendStatus(STATUS_CODE.OK);
  } catch (error) {
    res.sendStatus(STATUS_CODE.INTERNAL_SERVER_ERROR);
  }
};

export default editImage;
