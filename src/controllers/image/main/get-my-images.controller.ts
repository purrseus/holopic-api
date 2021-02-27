import { ImageStatus, STATUS_CODE } from '../../../constants';
import IImage from '../../../models/image/types';
import findImagesService from '../../../services/image/find-images.services';
import { ControllerType, UidType } from '../../controller-type';

const getMyImages: ControllerType = async (req, res) => {
  const { uid }: UidType = res.locals.user;
  const { page } = req.query;

  try {
    const myImages: IImage[] = await findImagesService(
      uid as string,
      page as string,
      { user: uid as string, status: ImageStatus.UPLOADED },
    );
    res.status(STATUS_CODE.OK).json(myImages);
  } catch (error) {
    res.sendStatus(STATUS_CODE.INTERNAL_SERVER_ERROR);
  }
};

export default getMyImages;
