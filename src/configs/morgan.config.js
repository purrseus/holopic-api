const path = require('path');
const rfs = require('rotating-file-stream');

const { IS_PRODUCTION, ROOT_DIR } = require('../constants');

// create a rotating write stream
const accessLogStream =
  IS_PRODUCTION &&
  rfs.createStream('access.log', {
    interval: '1d', // rotate daily
    path: path.join(ROOT_DIR, 'log'),
  });

module.exports = accessLogStream;
