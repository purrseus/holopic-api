const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { STATUS_CODE } = require('../constants');
const { generateAccessToken } = require('../utils');

module.exports.generateNewAccessToken = async (req, res) => {
  const refreshToken = req.body.refreshToken;
  if (!refreshToken) {
    res.sendStatus(STATUS_CODE.UNAUTHORIZED);
    return;
  }

  try {
    const { uid } = jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY);
    const user = await User.findOne({ uid: uid });
    const accessToken = generateAccessToken({ uid: user.uid });

    user.token.accessToken = accessToken;
    await user.save();

    res.status(STATUS_CODE.CREATED).json({ accessToken });
  } catch (error) {
    res.sendStatus(STATUS_CODE.FORBIDDEN);
  }
};

module.exports.loginWithPhoneNumber = async (_, res) => {
  const {
    // eslint-disable-next-line camelcase
    decodedIdToken: { phone_number, user_id },
  } = res.locals;

  try {
    const userExist = await User.findOne({
      phoneNumber: phone_number,
    });

    if (!userExist) {
      const savedUser = await User.create({
        status: 'ACTIVE',
        phoneNumber: phone_number,
        lastLogin: Date.now(),
        uid: user_id,
        token: {
          accessToken: generateAccessToken({ uid: user_id }),
          refreshToken: jwt.sign(
            { uid: user_id },
            process.env.REFRESH_SECRET_KEY,
          ),
        },
        userProfile: {
          name: '',
          username: `@user_${user_id.slice(-6)}`,
        },
      });
      res.status(STATUS_CODE.CREATED).json(savedUser);
      return;
    }

    userExist.status = 'ACTIVE';
    userExist.lastLogin = Date.now();
    userExist.token.accessToken = generateAccessToken({ uid: user_id });
    userExist.token.refreshToken = jwt.sign(
      { uid: user_id },
      process.env.REFRESH_SECRET_KEY,
    );

    const user = await userExist.save();
    res.status(STATUS_CODE.OK).json(user);
  } catch (error) {
    console.log(error);
  }
};
