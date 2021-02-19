const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { STATUS_CODE } = require('../constants');
const { generateAccessToken } = require('../utils');

module.exports.refreshToken = async (req, res) => {
  const refreshToken = req.body.refreshToken;
  if (!refreshToken) {
    res.sendStatus(STATUS_CODE.BAD_REQUEST);
    return;
  }

  try {
    const { uid } = jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY);
    const user = await User.findOne({ uid: uid });
    const accessToken = generateAccessToken({ uid: user.uid });

    res
      .set({
        Authorization: `Bearer ${accessToken}`,
      })
      .sendStatus(STATUS_CODE.CREATED);
  } catch (error) {
    res.sendStatus(STATUS_CODE.UNAUTHORIZED);
  }
};

module.exports.loginWithPhoneNumber = async (_, res) => {
  const {
    // eslint-disable-next-line camelcase
    decodedIdToken: { phone_number, user_id },
  } = res.locals;
  const token = {
    accessToken: generateAccessToken({ uid: user_id }),
    refreshToken: jwt.sign({ uid: user_id }, process.env.REFRESH_SECRET_KEY),
  };

  try {
    const userExist = await User.findOne({
      uid: user_id,
    });

    if (!userExist) {
      await User.create({
        status: 'ACTIVE',
        phoneNumber: phone_number,
        lastLogin: Date.now(),
        uid: user_id,
        userProfile: {
          username: `@user_${user_id.slice(-6)}`,
        },
      });

      res.status(STATUS_CODE.CREATED).json(token);
      return;
    }

    if (userExist.status === 'ACTIVE') {
      res.status(STATUS_CODE.FORBIDDEN).json({
        message: 'you have logged in with another device',
      });
      return;
    }

    // if userExist.status = DELETED.....

    userExist.status = 'ACTIVE';
    userExist.lastLogin = Date.now();
    await userExist.save();

    res.status(STATUS_CODE.OK).json(token);
  } catch (error) {
    console.log(error);
    res.sendStatus(STATUS_CODE.INTERNAL_SERVER_ERROR);
  }
};

module.exports.logout = async (_, res) => {
  const { uid } = res.locals.user;
  try {
    await User.updateOne({ uid: uid }, { status: 'INACTIVE' });
    res.sendStatus(STATUS_CODE.OK);
  } catch (error) {
    res.sendStatus(STATUS_CODE.INTERNAL_SERVER_ERROR);
  }
};
