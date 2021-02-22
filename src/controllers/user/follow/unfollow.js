const User = require('../../../models/user');
const { STATUS_CODE } = require('../../../constants');

const unfollow = async (req, res) => {
  const { uid } = res.locals.user;
  const { uid: followUid } = req.params;

  try {
    const user = await User.findOne({ uid });

    if (!user) {
      res.sendStatus(STATUS_CODE.INTERNAL_SERVER_ERROR);
      return;
    }

    const unfollowUser = await User.findOneAndUpdate(
      { uid: followUid },
      {
        $pull: { 'userProfile.followers': user.uid },
        $inc: { 'userProfile.followersCount': -1 },
      },
    );

    if (!unfollowUser) {
      res.sendStatus(STATUS_CODE.BAD_REQUEST);
      return;
    }

    const index = user.userProfile.following.indexOf(unfollowUser.uid);

    if (index === -1) {
      res.sendStatus(STATUS_CODE.INTERNAL_SERVER_ERROR);
      return;
    }

    user.userProfile.following.splice(index, 1);
    user.userProfile.followingCount -= 1;

    await user.save();

    res.sendStatus(STATUS_CODE.OK);
  } catch (error) {
    res.sendStatus(STATUS_CODE.INTERNAL_SERVER_ERROR);
  }
};

module.exports = unfollow;
