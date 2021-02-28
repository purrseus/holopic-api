import { STATUS_CODE } from '../../../constants';
import IImage from '../../../models/image/types';
import findMyLikesService from '../../../services/image/find-my-likes.service';
import { ControllerType, UidType } from '../../types';

const getMyLikes: ControllerType = async (req, res) => {
  const { uid }: UidType = res.locals.user;
  const { page } = req.query;

  try {
    const myLikes: IImage[] = await findMyLikesService(
      uid as string,
      page as string,
    );
    res.status(STATUS_CODE.OK).json(myLikes);
  } catch (error) {
    res.sendStatus(STATUS_CODE.INTERNAL_SERVER_ERROR);
  }
};

export default getMyLikes;
