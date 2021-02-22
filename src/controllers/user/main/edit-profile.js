const editUserProfileService = require('../../../services/user/edit-user-profile');
const { STATUS_CODE } = require('../../../constants');

const editProfile = async (req, res) => {
  const { uid } = res.locals.user;

  try {
    const updatedUser = await editUserProfileService(uid, req.body);

    if (!updatedUser) {
      res
        .status(STATUS_CODE.CONFLICT)
        .json({ message: 'username already taken' });
      return;
    }

    res.status(STATUS_CODE.OK).json(updatedUser);
  } catch (error) {
    res.sendStatus(STATUS_CODE.INTERNAL_SERVER_ERROR);
  }
};

module.exports = editProfile;
