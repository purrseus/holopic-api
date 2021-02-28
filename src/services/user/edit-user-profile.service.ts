import User from '../../models/user/user.model';
import { IAccount, IProfile } from '../../models/user/types';

type EditUserProfileServiceType = (
  uid: string,
  body: Omit<IProfile, 'avatar'>,
) => Promise<IAccount | null>;

const editUserProfileService: EditUserProfileServiceType = async (
  uid,
  body,
) => {
  const { fullName, username, gender, bio, location } = body;

  const editProfile: Record<string, string | undefined> = {
    'profile.fullName': fullName,
    'profile.username': username,
    'profile.gender': gender,
    'profile.bio': bio,
    'profile.location': location,
  };

  const usernameExists: boolean = await User.exists({
    'profile.username': username,
  });

  if (usernameExists) return null;

  const updatedUser: IAccount | null = await User.findOneAndUpdate(
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
