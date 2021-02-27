import { ImageStatus, STATUS_CODE } from '../../../constants';
import IImage from '../../../models/image/types';
import findImagesService from '../../../services/image/find-images.services';
import { ControllerType, UidType } from '../../controller-type';

const getImagesUser: ControllerType = async (req, res) => {
  const { uid }: UidType = res.locals.user;
  const { userId, page } = req.query;

  try {
    const imagesUser: IImage[] = await findImagesService(
      uid as string,
      page as string,
      {
        user: userId as string,
        status: ImageStatus.UPLOADED,
      },
    );
    res.status(STATUS_CODE.OK).json(imagesUser);
  } catch (error) {
    res.sendStatus(STATUS_CODE.INTERNAL_SERVER_ERROR);
  }
};

export default getImagesUser;
