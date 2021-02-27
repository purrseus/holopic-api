import User from '../../models/user/user.model';
import IUser from '../../models/user/types';

type UnfollowUserServiceType = (
  uid: string,
  unfollowUid: string,
) => Promise<boolean>;

const unfollowUserService: UnfollowUserServiceType = async (
  uid,
  unfollowUid,
) => {
  const updatedFollowingUser: IUser | null = await User.findOneAndUpdate(
    { uid },
    { $pullAll: { 'profile.following': [unfollowUid] } },
  );
  if (!updatedFollowingUser) return false;

  await User.findOneAndUpdate(
    { uid: unfollowUid },
    { $pullAll: { 'profile.followers': [uid] } },
    { new: true },
  );

  return true;
};

export default unfollowUserService;
