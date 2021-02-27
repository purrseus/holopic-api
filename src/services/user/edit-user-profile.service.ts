import User from '../../models/user/user.model';
import IUser, { IProfile } from '../../models/user/types';

type EditUserProfileServiceType = (
  uid: string,
  body: IProfile,
) => Promise<IUser | null>;

const editUserProfileService: EditUserProfileServiceType = async (
  uid,
  body,
) => {
  const { fullName, username, gender, avatar, bio, location } = body;

  const editProfile: Record<string, string | undefined> = {
    'profile.fullName': fullName,
    'profile.username': username,
    'profile.gender': gender,
    'profile.avatar': avatar,
    'profile.bio': bio,
    'profile.location': location,
  };

  const usernameExists: boolean = await User.exists({
    'profile.username': username,
  });

  if (usernameExists) return null;

  const updatedUser: IUser | null = await User.findOneAndUpdate(
    { uid },
    editProfile,
    {
      omitUndefined: true,
      new: true,
    },
  );

  return updatedUser;
};

export default editUserProfileService;
