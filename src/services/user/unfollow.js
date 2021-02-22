const User = require('../../models/user');

const unfollowUserService = async (uid, unfollowUid) => {
  const user = await User.findOneAndUpdate(
    { uid },
    { $pull: { 'profile.following': unfollowUid } },
  );
  if (!user) return false;

  const followUser = await User.findOneAndUpdate(
    { uid: unfollowUid },
    { $pull: { 'profile.followers': uid } },
    { new: true },
  );

  return !!followUser;
};

module.exports = unfollowUserService;
