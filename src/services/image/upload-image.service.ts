import Image from '../../models/image/image.model';
import User from '../../models/user/user.model';
import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import IImage from '../../models/image/types';

type UploadImageServiceType = (
  uid: string,
  imagePath: string,
  title: string,
  tags: string[],
) => Promise<false | IImage>;

const uploadImageService: UploadImageServiceType = async (
  uid,
  imagePath,
  title,
  tags,
) => {
  const result: UploadApiResponse = await cloudinary.uploader.upload(imagePath);

  if (!result) {
    return false;
  }
  fs.unlinkSync(imagePath);
  const createdImage: IImage = await Image.create({
    title: title,
    tags: tags,
    publicId: result.public_id,
    url: result.url,
    width: result.width,
    height: result.height,
    user: uid,
  });

  await User.updateOne(
    { uid },
    { $push: { 'profile.myShots': result.public_id } },
  );

  return createdImage;
};

export default uploadImageService;
