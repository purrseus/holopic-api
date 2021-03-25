import User from '../../models/user/user.model';
import jwt from 'jsonwebtoken';
import { STATUS_CODE, UserStatus } from '../../constants/index';
import { generateAccessToken } from '../../utilities/index';
import IUser from '../../models/user/types';
import { ControllerType } from '../types';

interface IDecodedIdToken {
  phone_number: string;
  user_id: string;
}

const loginWithPhoneNumber: ControllerType = async (req, res) => {
  const { phone_number, user_id }: IDecodedIdToken = res.locals.decodedIdToken;

  try {
    const userExists: any = await User.findOne({ phoneNumber: phone_number });

    if (!userExists) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const createdUser: IUser = await User.create({
        phoneNumber: phone_number,
        lastLogin: Date.now(),
        uid: user_id,
        profile: {
          avatar: {
            url:
              'https://res.cloudinary.com/holopic/image/upload/v1614434435/default-avatar_fjtr87.jpg',
          },
          username: `user_${user_id.slice(-6)}`,
        },
      });

      res.status(STATUS_CODE.CREATED).json({
        token: {
          accessToken: generateAccessToken({ uid: user_id }),
          refreshToken: jwt.sign(
            { uid: user_id },
            process.env.REFRESH_SECRET_KEY as string,
          ),
        },
      });
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

    res.status(STATUS_CODE.OK).json({
      token: {
        accessToken: generateAccessToken({ uid: userExists.uid }),
        refreshToken: jwt.sign(
          { uid: userExists.uid },
          process.env.REFRESH_SECRET_KEY as string,
        ),
      },
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(STATUS_CODE.INTERNAL_SERVER_ERROR);
  }
};

export default loginWithPhoneNumber;
