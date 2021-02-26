const deleteImageService = require('../../../services/image/delete-image.service');
const { STATUS_CODE } = require('../../../constants');

const deleteImage = async (req, res) => {
  const { uid } = res.locals.user;
  const { imageId } = req.params;

  try {
    const deletedImage = await deleteImageService(uid, imageId);
    if (!deletedImage) {
      res.sendStatus(STATUS_CODE.INTERNAL_SERVER_ERROR);
    }
    res.sendStatus(STATUS_CODE.OK);
  } catch (error) {
    res.sendStatus(STATUS_CODE.INTERNAL_SERVER_ERROR);
  }
};

module.exports = deleteImage;
