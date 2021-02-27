import { STATUS_CODE } from '../../../constants';
import viewImageService from '../../../services/image/view-image.service';
import { ControllerType, UidType } from '../../controller-type';

const view: ControllerType = async (req, res) => {
  const { uid }: UidType = res.locals.user;
  const { imageId } = req.params;

  try {
    await viewImageService(uid as string, imageId as string);
    res.sendStatus(STATUS_CODE.OK);
  } catch (error) {
    res.sendStatus(STATUS_CODE.INTERNAL_SERVER_ERROR);
  }
};

export default view;
