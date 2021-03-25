import IUser from '../../models/user/types';
import User from '../../models/user/user.model';

type FindUsersServiceType = (
  query: Record<string, string | RegExp>,
  myUid: string,
  page: string,
) => Promise<IUser[]>;

const findUsersService: FindUsersServiceType = async (query, myUid, page) => {
  const users: IUser[] = await User.aggregate([
    { $match: query },
    { $skip: (+page - 1) * 20 },
    { $limit: 20 },
    {
      $project: {
        uid: 1,
        'profile.fullName': 1,
        'profile.username': 1,
        'profile.avatar': 1,
        'profile.gender': 1,
        'profile.bio': 1,
        'profile.location': 1,
        followers: { $size: '$profile.followers' },
        following: { $size: '$profile.following' },
        images: { $size: '$profile.myShots' },
        isFollowing: {
          $cond: {
            if: { $in: [myUid, '$profile.followers'] },
            then: true,
            else: false,
          },
        },
      },
    },
  ]);

  return users;
};

export default findUsersService;
