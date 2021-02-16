const express = require('express');
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
const router = express.Router();
const port = process.env.PORT || 3000;

initializeFirebaseAdminApp();
connectToDataBase();

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
router.use('/auth', require('./routes/auth.route'));

app.listen(port, () => {
  console.log(`[Holopic API] Server is running on port ${port}`);
});
