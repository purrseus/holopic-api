const User = require('../models/user.model');
const { STATUS_CODE } = require('../constants');

module.exports.getMyAccount = async (_, res) => {
  const { uid } = res.locals.user;
  try {
    const user = await User.findOne({ uid: uid });
    res.status(STATUS_CODE.OK).json(user);
  } catch (error) {
    res.sendStatus(STATUS_CODE.INTERNAL_SERVER_ERROR);
  }
};

module.exports.editProfile = async (req, res) => {
  const { uid } = res.locals.user;
  const {
    firstName,
    lastName,
    username,
    gender,
    avatar,
    aboutYou,
    location,
  } = req.body;

  const editUserProfile = {
    'userProfile.firstName': firstName,
    'userProfile.lastName': lastName,
    'userProfile.username': username,
    'userProfile.gender': gender,
    'userProfile.avatar': avatar,
    'userProfile.aboutYou': aboutYou,
    'userProfile.location': location,
    updateAt: Date.now(),
  };

  try {
    const usernameExist = await User.findOne(
      { username: username },
      'userProfile',
    );

    if (usernameExist) {
      res
        .status(STATUS_CODE.BAD_REQUEST)
        .json({ message: 'username already taken' });
      return;
    }

    const updatedUser = await User.findOneAndUpdate(
      { uid: uid },
      { $set: editUserProfile },
      { omitUndefined: true, new: true },
    );

    res.status(STATUS_CODE.OK).json(updatedUser);
  } catch (error) {
    res.sendStatus(STATUS_CODE.INTERNAL_SERVER_ERROR);
  }
};
