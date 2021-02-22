const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const { STATUS_CODE } = require('../../constants');
const { generateAccessToken } = require('../../utilities');
const findUserService = require('../../services/user/find-user');

const loginWithPhoneNumber = async (_, res) => {
  const {
    // eslint-disable-next-line camelcase
    decodedIdToken: { phone_number, user_id },
  } = res.locals;
  const token = {
    accessToken: generateAccessToken({ uid: user_id }),
    refreshToken: jwt.sign({ uid: user_id }, process.env.REFRESH_SECRET_KEY),
  };

  try {
    const userExists = await findUserService(user_id, null, { status: 1 });

    if (!userExists) {
      const createdUser = await User.create({
        status: 'ACTIVE',
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

    if (userExists.status === 'ACTIVE') {
      res.status(STATUS_CODE.FORBIDDEN).json({
        message: 'you have logged in with another device',
      });
      return;
    }

    userExists.status = 'ACTIVE';
    userExists.lastLogin = Date.now();
    await userExists.save();

    res.status(STATUS_CODE.OK).json({ token, user: userExists });
  } catch (error) {
    console.log(error);
    res.sendStatus(STATUS_CODE.INTERNAL_SERVER_ERROR);
  }
};

module.exports = loginWithPhoneNumber;
