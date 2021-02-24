const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const { errors } = require('celebrate');
const path = require('path');
require('dotenv').config();

const accessLogStream = require('./configs/morgan.config');
const initializeFirebaseAdminApp = require('./configs/firebase.config');
const connectToDataBase = require('./configs/db.config');
const { GLOBAL_PREFIX, ROOT_DIR, IS_PRODUCTION } = require('./constants');
const verifyToken = require('./middlewares/verify-token');

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

app.use(express.static(path.join(ROOT_DIR, 'uploads')));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded;

app.use(GLOBAL_PREFIX, router);
router.use('/auth', require('./routes/auth'));
router.use('/user', verifyToken, require('./routes/user'));
app.use(errors());

app.listen(port, () => {
  console.log(`[Holopic API] Server is running on port ${port}`);
});
