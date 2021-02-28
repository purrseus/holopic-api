import { STATUS_CODE } from '../../../constants';
import IImage from '../../../models/image/types';
import getNewImagesService from '../../../services/image/get-new-images.service';
import { ControllerType, UidType } from '../../types';

const getNewImages: ControllerType = async (req, res) => {
  const { uid }: UidType = res.locals.user;
  const { page } = req.query;

  try {
    const newImages: IImage[] = await getNewImagesService(
      uid as string,
      page as string,
    );
    res.status(STATUS_CODE.OK).json(newImages);
  } catch (error) {
    res.sendStatus(STATUS_CODE.INTERNAL_SERVER_ERROR);
  }
};

export default getNewImages;
