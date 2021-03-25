import User from '../../models/user/user.model';
import IUser from '../../models/user/types';

interface IField {
  status: number;
}

type FindUserServiceType = (
  uid: string,
  myUid: string | null,
  fields?: IField,
) => Promise<null | IUser>;

const findUserService: FindUserServiceType = async (uid, myUid, fields) => {
  const user: null | IUser[] = await User.aggregate([
    { $match: { uid: uid } },
    {
      $project: {
        uid: 1,
        'profile.fullName': 1,
        'profile.username': 1,
        'profile.avatar.url': 1,
        'profile.avatar.publicId': 1,
        'profile.gender': 1,
        'profile.bio': 1,
        'profile.location': 1,
        followers: { $size: '$profile.followers' },
        following: { $size: '$profile.following' },
        images: { $size: '$profile.myShots' },
        ...fields,
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

  return !user.length ? null : user[0];
};

export default findUserService;
