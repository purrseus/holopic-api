import jwt from 'jsonwebtoken';
import { STATUS_CODE } from '../constants/index';
import { MiddlewareType } from './types';

const verifyToken: MiddlewareType = (req, res, next) => {
  const authHeader: string | undefined = req.headers.authorization;
  const token: string | false = !!authHeader && authHeader.split(' ')[1];
  if (!token) {
    res.sendStatus(STATUS_CODE.UNAUTHORIZED);
    return;
  }

  try {
    const user = jwt.verify(token, process.env.ACCESS_SECRET_KEY as string);
    res.locals.user = user;
    next();
  } catch (error) {
    res.sendStatus(STATUS_CODE.UNAUTHORIZED);
  }
};

export default verifyToken;
