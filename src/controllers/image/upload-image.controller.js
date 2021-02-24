const { STATUS_CODE } = require('../../constants');

const uploadImage = (req, res) => {
  // verify token
  if (!req.file) {
    res.sendStatus(STATUS_CODE.BAD_REQUEST);
    return;
  }
  // dto body
  // upload image to cloudinary
  // using filepath
  // if err -> 500
  // create image -> save to DB (service)
};

module.exports = uploadImage;
