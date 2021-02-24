const User = require('../../models/user/user.model');

const findUserService = async (uid, myUid, fields) => {
  const user = await User.aggregate([
    { $match: { uid: uid } },
    {
      $project: {
        uid: 1,
        'profile.fullName': 1,
        'profile.username': 1,
        'profile.avatar': 1,
        'profile.gender': 1,
        'profile.bio': 1,
        'profile.location': 1,
        ...fields,
        following: {
          $cond: {
            if: { $in: [myUid, '$profile.followers'] },
            then: true,
            else: false,
          },
        },
      },
    },
  ]);

  return !user.length ? null : user[0];
};

module.exports = findUserService;
