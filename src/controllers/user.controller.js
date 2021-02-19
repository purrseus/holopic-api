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
  const { name, gender, avatar } = req.body;
  const editUserProfile = {
    'userProfile.name': name,
    'userProfile.gender': gender,
    'userProfile.avatar': avatar,
  };

  !name && delete editUserProfile['userProfile.name'];
  !gender && delete editUserProfile['userProfile.gender'];
  !avatar && delete editUserProfile['userProfile.avatar'];

  try {
    const updatedUser = await User.findOneAndUpdate(
      { uid: uid },
      { $set: editUserProfile },
    );
    res.status(STATUS_CODE.OK).json(updatedUser);
  } catch (error) {
    res.sendStatus(STATUS_CODE.INTERNAL_SERVER_ERROR);
  }
};
