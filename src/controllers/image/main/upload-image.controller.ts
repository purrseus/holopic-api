import uploadImageService from '../../../services/image/upload-image.service';
import { STATUS_CODE } from '../../../constants/index';
import { ControllerType, UidType } from '../../types';
import IImage from '../../../models/image/types';

const uploadImage: ControllerType = async (req, res) => {
  const { uid }: UidType = res.locals.user;
  const { title, tags }: { title: string; tags: string } = req.body;
  const tagsArr: string[] = tags.split(' ');

  if (!req.file) {
    res.sendStatus(STATUS_CODE.BAD_REQUEST);
    return;
  }

  try {
    const createdImage: false | IImage = await uploadImageService(
      uid as string,
      req.file.path,
      title as string,
      tagsArr.filter(tag => tag !== ''),
    );

    if (!createdImage) {
      res.sendStatus(STATUS_CODE.INTERNAL_SERVER_ERROR);
      return;
    }

    res.status(STATUS_CODE.CREATED).json(createdImage);
  } catch (error) {
    res.sendStatus(STATUS_CODE.INTERNAL_SERVER_ERROR);
  }
};

export default uploadImage;
