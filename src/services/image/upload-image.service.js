const Image = require('../../models/image/image.model');
const User = require('../../models/user/user.model');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

const uploadImageService = async (uid, imagePath, title, tags) => {
  const result = await cloudinary.uploader.upload(imagePath);

  if (!result) {
    return false;
  }
  fs.unlinkSync(imagePath);
  const createdImage = await Image.create({
    title: title,
    tags: tags,
    publicId: result.public_id,
    url: result.url,
    user: uid,
  });

  await User.updateOne(
    { uid },
    { $push: { 'profile.myShots': result.public_id } },
  );

  return createdImage;
};

module.exports = uploadImageService;
