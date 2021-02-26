const User = require('../../models/user/user.model');
const Image = require('../../models/image/image.model');

const editImageService = async (uid, imageId, title, tags) => {
  const isAuthorized = await User.exists({
    uid: uid,
    'profile.myShots': imageId,
  });

  if (!isAuthorized) {
    return false;
  }

  const editedImage = await Image.findOneAndUpdate(
    { publicId: imageId },
    {
      title: title,
      tags: tags,
    },
    { omitUndefined: true, new: true },
  );

  return editedImage;
};

module.exports = editImageService;
