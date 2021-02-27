import path from 'path';
import { RotatingFileStream, createStream } from 'rotating-file-stream';

import { ROOT_DIR } from '../constants/index';

// create a rotating write stream
const accessLogStream: RotatingFileStream = createStream('access.log', {
  interval: '1d', // rotate daily
  path: path.join(ROOT_DIR, 'log'),
});

export default accessLogStream;
