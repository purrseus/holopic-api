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
  const { firstName, lastName, gender, avatar, aboutYou, location } = req.body;

  const editUserProfile = {
    'userProfile.firstName': firstName,
    'userProfile.lastName': lastName,
    'userProfile.gender': gender,
    'userProfile.avatar': avatar,
    'userProfile.aboutYou': aboutYou,
    'userProfile.location': location,
    updateAt: Date.now(),
  };

  !firstName && delete editUserProfile['userProfile.firstName'];
  !lastName && delete editUserProfile['userProfile.lastName'];
  !gender && delete editUserProfile['userProfile.gender'];
  !avatar && delete editUserProfile['userProfile.avatar'];
  !aboutYou && delete editUserProfile['userProfile.aboutYou'];
  !location && delete editUserProfile['userProfile.location'];

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
