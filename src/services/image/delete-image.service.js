const User = require('../../models/user/user.model');
const Image = require('../../models/image/image.model');
const cloudinary = require('cloudinary').v2;

const deleteImageService = async (uid, imageId) => {
  const isAuthorized = await User.exists({
    uid: uid,
    'profile.myShots': imageId,
  });

  if (!isAuthorized) {
    return false;
  }

  const result = await cloudinary.uploader.destroy(imageId);

  if (result?.result !== 'ok') {
    return false;
  }

  const editedImage = await Image.findOneAndUpdate(
    { publicId: imageId },
    {
      status: 'DELETED',
      url: 'deleted',
    },
    { new: true },
  );

  return editedImage;
};

module.exports = deleteImageService;
