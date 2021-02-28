import User from '../../models/user/user.model';
import jwt from 'jsonwebtoken';
import { STATUS_CODE, UserStatus } from '../../constants/index';
import { generateAccessToken } from '../../utilities/index';
import findUserService from '../../services/user/find-user.service';
import IUser from '../../models/user/types';
import { ControllerType, IToken } from '../types';

interface IDecodedIdToken {
  phone_number: string;
  user_id: string;
}

const loginWithPhoneNumber: ControllerType = async (req, res) => {
  const { phone_number, user_id }: IDecodedIdToken = res.locals.decodedIdToken;
  const token: IToken = {
    accessToken: generateAccessToken({ uid: user_id }),
    refreshToken: jwt.sign(
      { uid: user_id },
      process.env.REFRESH_SECRET_KEY as string,
    ),
  };

  try {
    const userExists: IUser | null = await findUserService(user_id, null, {
      status: 1,
    });

    if (!userExists) {
      const createdUser: IUser = await User.create({
        phoneNumber: phone_number,
        lastLogin: Date.now(),
        uid: user_id,
        profile: {
          username: `user_${user_id.slice(-6)}`,
        },
      });

      res.status(STATUS_CODE.CREATED).json({ token, user: createdUser });
      return;
    }

    if (userExists.status === UserStatus.ACTIVE) {
      res.status(STATUS_CODE.FORBIDDEN).json({
        message: 'you have logged in with another device',
      });
      return;
    }

    userExists.status = UserStatus.ACTIVE;
    userExists.lastLogin = Date.now();
    await userExists.save();

    res.status(STATUS_CODE.OK).json({ token, user: userExists });
  } catch (error) {
    console.log(error);
    res.sendStatus(STATUS_CODE.INTERNAL_SERVER_ERROR);
  }
};

export default loginWithPhoneNumber;
