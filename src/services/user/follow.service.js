const User = require('../../models/user/user.model');

const followUserService = async (uid, followUid) => {
  const user = await User.findOneAndUpdate(
    { uid },
    { $push: { 'profile.following': followUid } },
  );
  if (!user) return false;

  const followUser = await User.findOneAndUpdate(
    { uid: followUid },
    { $push: { 'profile.followers': uid } },
    { new: true },
  );

  return !!followUser;
};

module.exports = followUserService;
