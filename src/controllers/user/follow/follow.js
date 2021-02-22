const User = require('../../../models/user');
const { STATUS_CODE } = require('../../../constants');

const follow = async (req, res) => {
  const { uid } = res.locals.user;
  const { uid: followUid } = req.params;

  try {
    const user = await User.findOne({ uid });

    if (!user) {
      res.sendStatus(STATUS_CODE.INTERNAL_SERVER_ERROR);
      return;
    }

    const followUser = await User.findOneAndUpdate(
      { uid: followUid },
      {
        $push: { 'userProfile.followers': user.uid },
        $inc: { 'userProfile.followersCount': 1 },
      },
    );

    if (!followUser) {
      res.sendStatus(STATUS_CODE.BAD_REQUEST);
      return;
    }

    user.userProfile.following.push(followUser.uid);
    user.userProfile.followingCount += 1;

    await user.save();

    res.sendStatus(STATUS_CODE.OK);
  } catch (error) {
    res.sendStatus(STATUS_CODE.INTERNAL_SERVER_ERROR);
  }
};

module.exports = follow;
