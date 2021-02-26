const editImageService = require('../../../services/image/edit-image.service');
const { STATUS_CODE } = require('../../../constants');

const editImage = async (req, res) => {
  const { uid } = res.locals.user;
  const { imageId } = req.params;
  const { title, tags } = req.body;

  try {
    const editedImage = await editImageService(uid, imageId, title, tags);
    if (!editedImage) {
      res.sendStatus(STATUS_CODE.INTERNAL_SERVER_ERROR);
    }
    res.sendStatus(STATUS_CODE.OK);
  } catch (error) {
    res.sendStatus(STATUS_CODE.INTERNAL_SERVER_ERROR);
  }
};

module.exports = editImage;
