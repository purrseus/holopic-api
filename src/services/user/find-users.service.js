const User = require('../../models/user/user.model');

const findUsersService = async (query, myUid, page) => {
  const users = await User.aggregate([
    { $match: query },
    {
      $project: {
        uid: 1,
        'profile.fullName': 1,
        'profile.username': 1,
        'profile.avatar': 1,
        'profile.gender': 1,
        'profile.bio': 1,
        'profile.location': 1,
        following: {
          $cond: {
            if: { $in: [myUid, '$profile.followers'] },
            then: true,
            else: false,
          },
        },
      },
    },
    { $skip: (page - 1) * 20 },
    { $limit: 20 },
  ]);

  return !users.length ? [] : users;
};

module.exports = findUsersService;
