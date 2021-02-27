import { Router } from 'express';
import { celebrate } from 'celebrate';
const router: Router = Router();

import refreshTokenDto from '../dto/auth/refresh-token.dto';
import verifyFirebaseTokenDto from '../dto/auth/verify-firebase-token.dto';

import verifyFirebaseToken from '../middlewares/verify-firebase-token.middleware';
import verifyToken from '../middlewares/verify-token.middleware';

import refreshToken from '../controllers/auth/refresh-token.controller';
import loginWithPhoneNumber from '../controllers/auth/login-with-phone-number.controller';
import logout from '../controllers/auth/logout.controller';

router.post('/refresh-token', celebrate(refreshTokenDto), refreshToken);
router.post(
  '/login/phone-number',
  celebrate(verifyFirebaseTokenDto),
  verifyFirebaseToken,
  loginWithPhoneNumber,
);
router.get('/logout', verifyToken, logout);

export default router;
