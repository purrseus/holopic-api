import User from '../../models/user/user.model';
import IUser from '../../models/user/types';

type FollowUserServiceType = (
  uid: string,
  followUid: string,
) => Promise<boolean>;

const followUserService: FollowUserServiceType = async (uid, followUid) => {
  const followed: IUser | null = await User.findOne({
    uid,
    'profile.following': followUid,
  });

  if (followed) return true;

  const updatedFollowingUser: IUser | null = await User.findOneAndUpdate(
    { uid },
    { $push: { 'profile.following': followUid } },
  );
  if (!updatedFollowingUser) return false;

  const followUser: IUser | null = await User.findOneAndUpdate(
    { uid: followUid },
    { $push: { 'profile.followers': uid } },
    { new: true },
  );

  return !!followUser;
};

export default followUserService;
