import { ImageStatus, STATUS_CODE } from '../../../constants';
import IImage from '../../../models/image/types';
import findImagesService from '../../../services/image/find-images.services';
import { ControllerType, UidType } from '../../types';

const searchImages: ControllerType = async (req, res) => {
  const { uid }: UidType = res.locals.user;
  const { q, page } = req.query;
  const tags: string[] = (q as string).split(' ');

  try {
    const result: IImage[] = await findImagesService(
      uid as string,
      page as string,
      {
        tags: { $all: tags },
        status: ImageStatus.UPLOADED,
      },
    );
    res.status(STATUS_CODE.OK).json(result);
  } catch (error) {
    res.sendStatus(STATUS_CODE.INTERNAL_SERVER_ERROR);
  }
};

export default searchImages;
