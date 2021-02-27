import { auth } from 'firebase-admin';
import { STATUS_CODE } from '../constants/index';
import { MiddlewareType } from './types';

const verifyFirebaseToken: MiddlewareType = async (req, res, next) => {
  try {
    const decodedIdToken: auth.DecodedIdToken = await auth().verifyIdToken(
      req.body.idToken,
    );
    res.locals.decodedIdToken = decodedIdToken;
    next();
  } catch (error) {
    res
      .status(STATUS_CODE.UNAUTHORIZED)
      .json({ message: error.errorInfo.message.replace(/\. .+$/g, '') });
  }
};

export default verifyFirebaseToken;
