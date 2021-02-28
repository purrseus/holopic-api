import User from '../../models/user/user.model';
import jwt from 'jsonwebtoken';
import { STATUS_CODE } from '../../constants/index';
import {
  generateAccessToken,
  GenerateAccessTokenType,
} from '../../utilities/index';
import { ControllerType, IToken } from '../types';

const refreshToken: ControllerType = async (req, res) => {
  const { refreshToken }: Pick<IToken, 'refreshToken'> = req.body;

  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_SECRET_KEY as string,
    );

    if (!decoded || typeof decoded === 'string') {
      res.sendStatus(STATUS_CODE.UNAUTHORIZED);
      return;
    }

    const userExists: boolean = await User.exists({ uid: (<any>decoded).uid });

    if (userExists) {
      const accessToken: ReturnType<GenerateAccessTokenType> = generateAccessToken(
        {
          uid: (<any>decoded).uid,
        },
      );

      res
        .set({
          Authorization: `Bearer ${accessToken}`,
        })
        .sendStatus(STATUS_CODE.CREATED);
    } else {
      res.sendStatus(STATUS_CODE.INTERNAL_SERVER_ERROR);
    }
  } catch (error) {
    res.sendStatus(STATUS_CODE.UNAUTHORIZED);
  }
};

export default refreshToken;
