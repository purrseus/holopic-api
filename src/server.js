const express = require('express');
const router = express.Router();
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

const { accessLogStream } = require('./configs');
const initializeFirebaseAdminApp = require('./configs/firebase.config');
const connectToDataBase = require('./configs/db.config');
const { GLOBAL_PREFIX, ROOT_DIR, IS_PRODUCTION } = require('./constants');

const app = express();
initializeFirebaseAdminApp();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(helmet());
app.use(
  IS_PRODUCTION
    ? morgan('combined', { stream: accessLogStream })
    : morgan('dev'),
);

app.use(express.static(path.join(ROOT_DIR, 'public')));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded;

app.use(GLOBAL_PREFIX, router);

// router.use(/* ... */);
router.get('/', (_, res) => {
  res.send('test');
});

connectToDataBase();

app.listen(port, () => {
  console.log(`[Holopic API] Server is running on port ${port}`);
});
