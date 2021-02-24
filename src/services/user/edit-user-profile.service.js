const User = require('../../models/user/user.model');

const editUserProfileService = async (uid, body) => {
  const { fullName, username, gender, avatar, bio, location } = body;

  const editProfile = {
    'profile.fullName': fullName,
    'profile.username': username,
    'profile.gender': gender,
    'profile.avatar': avatar,
    'profile.bio': bio,
    'profile.location': location,
  };

  const usernameExists = await User.exists({
    'profile.username': username,
  });

  if (usernameExists) return null;

  const updatedUser = await User.findOneAndUpdate({ uid }, editProfile, {
    omitUndefined: true,
    new: true,
  });

  return updatedUser;
};

module.exports = editUserProfileService;
