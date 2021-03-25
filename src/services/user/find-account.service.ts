import { IAccount } from '../../models/user/types';
import User from '../../models/user/user.model';

type FindAccountServiceType = (uid: string) => Promise<IAccount | null>;

const findAccountService: FindAccountServiceType = async uid => {
  const user: IAccount[] | null = await User.aggregate([
    { $match: { uid: uid } },
    {
      $project: {
        uid: 1,
        phoneNumber: 1,
        email: 1,
        'profile.fullName': 1,
        'profile.username': 1,
        'profile.avatar.url': 1,
        'profile.avatar.publicId': 1,
        'profile.gender': 1,
        'profile.bio': 1,
        'profile.location': 1,
        myLikes: { $size: '$profile.myLikes' },
        followers: { $size: '$profile.followers' },
        following: { $size: '$profile.following' },
        images: { $size: '$profile.myShots' },
      },
    },
  ]);

  return !user.length ? null : user[0];
};

export default findAccountService;
