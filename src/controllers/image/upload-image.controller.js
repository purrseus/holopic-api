const { STATUS_CODE } = require('../../constants');

const uploadImage = (req, res) => {
  if (!req.file) {
    res.sendStatus(STATUS_CODE.BAD_REQUEST);
    return 'upload';
  }
};

module.exports = uploadImage;
