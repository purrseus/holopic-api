const User = require('../../../models/user');
const { STATUS_CODE } = require('../../../constants');

const editProfile = async (req, res) => {
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
    const usernameExists = await User.exists({
      'userProfile.username': username,
    });

    if (usernameExists) {
      res
        .status(STATUS_CODE.CONFLICT)
        .json({ message: 'username already taken' });
      return;
    }

    const updatedUser = await User.findOneAndUpdate(
      { uid: uid },
      editUserProfile,
      {
        omitUndefined: true,
        new: true,
      },
    );

    res.status(STATUS_CODE.OK).json(updatedUser);
  } catch (error) {
    res.sendStatus(STATUS_CODE.INTERNAL_SERVER_ERROR);
  }
};

module.exports = editProfile;
