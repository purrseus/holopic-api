import express, { Application, Router } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import { errors } from 'celebrate';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

import accessLogStream from './configs/morgan.config';
import initializeFirebaseAdminApp from './configs/firebase.config';
import connectToDataBase from './configs/db.config';

import cloudinaryConfig from './configs/cloudinary.config';
import { GLOBAL_PREFIX, ROOT_DIR, IS_PRODUCTION } from './constants/index';
import verifyToken from './middlewares/verify-token.middleware';

import authRoute from './routes/auth.route';
import userRoute from './routes/user.route';
import imageRoute from './routes/image.route';

const app: Application = express();
const router: Router = express.Router();
const port: string | number = process.env.PORT || 3000;

initializeFirebaseAdminApp();
cloudinaryConfig.config();
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
router.use('/auth', authRoute);
router.use('/user', verifyToken, userRoute);
router.use('/image', verifyToken, imageRoute);
app.use(errors());

app.listen(port, () => {
  console.log(`[Holopic API] Server is running on port ${port}`);
});
