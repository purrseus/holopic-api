import { STATUS_CODE } from '../../../constants';
import IImage from '../../../models/image/types';
import getNewestByFollowedService from '../../../services/image/get-newest-by-followed.service';
import { ControllerType, UidType } from '../../types';

const getNewestByFollowed: ControllerType = async (req, res) => {
  const { uid }: UidType = res.locals.user;
  const { page } = req.query;

  try {
    const newestByFollowed: IImage[] = await getNewestByFollowedService(
      uid as string,
      page as string,
    );
    res.status(STATUS_CODE.OK).json(newestByFollowed);
  } catch (error) {
    res.sendStatus(STATUS_CODE.INTERNAL_SERVER_ERROR);
  }
};

export default getNewestByFollowed;
