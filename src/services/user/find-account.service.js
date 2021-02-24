const User = require('../../models/user/user.model');

const findAccountService = async uid => {
  const user = await User.aggregate([
    { $match: { uid: uid } },
    {
      $project: {
        uid: 1,
        phoneNumber: 1,
        email: 1,
        'profile.fullName': 1,
        'profile.username': 1,
        'profile.avatar': 1,
        'profile.gender': 1,
        'profile.bio': 1,
        'profile.location': 1,
        likedShots: { $size: '$profile.likedShots' },
        followers: { $size: '$profile.followers' },
        following: { $size: '$profile.following' },
      },
    },
  ]);

  return !user.length ? null : user[0];
};

module.exports = findAccountService;
