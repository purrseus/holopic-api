const multer = require('multer');
const path = require('path');
const { ROOT_DIR } = require('../constants');

const fileName = Date.now() + Math.ceil(Math.random() * 100);

const storage = multer.diskStorage({
  destination: function (_, __, callback) {
    callback(null, path.join(ROOT_DIR, 'uploads/images'));
  },
  filename: function (req, { originalname }, callback) {
    callback(null, fileName + originalname.match(/\.\w+$/));
  },
});

const fileFilter = (_, { originalname }, callback) => {
  if (!originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    callback(null, false);
  } else {
    callback(null, true);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 10_000_000 },
  fileFilter,
});

module.exports = upload;
