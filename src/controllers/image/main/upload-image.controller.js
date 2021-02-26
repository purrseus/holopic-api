const uploadImageService = require('../../../services/image/upload-image.service');
const { STATUS_CODE } = require('../../../constants');

const uploadImage = async (req, res) => {
  const { uid } = res.locals.user;
  const { title, tags } = req.body.data;
  if (!req.file) {
    res.sendStatus(STATUS_CODE.BAD_REQUEST);
    return;
  }

  try {
    const createdImage = await uploadImageService(
      uid,
      req.file.path,
      title,
      tags,
    );

    if (!createdImage) {
      res.sendStatus(STATUS_CODE.INTERNAL_SERVER_ERROR);
      return;
    }

    res.status(STATUS_CODE.CREATED);
  } catch (error) {
    res.sendStatus(STATUS_CODE.INTERNAL_SERVER_ERROR);
  }
};

module.exports = uploadImage;
