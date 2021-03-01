import { IAccount, IAvatar } from '../../models/user/types';
import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import User from '../../models/user/user.model';

type ChangeAvatarServiceType = (
  uid: string,
  imagePath: string,
  publicId: string,
) => Promise<IAvatar | null>;

const changeAvatarService: ChangeAvatarServiceType = async (
  uid,
  imagePath,
  publicId,
) => {
  if (publicId !== '') {
    const deleted: any = await cloudinary.uploader.destroy(publicId);

    if (deleted?.result !== 'ok') {
      return null;
    }
  }

  const result: UploadApiResponse = await cloudinary.uploader.upload(imagePath);

  if (!result) {
    return null;
  }
  fs.unlinkSync(imagePath);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const updatedUser: IAccount | null = await User.findOneAndUpdate(
    { uid },
    {
      'profile.avatar.url': result.url,
      'profile.avatar.publicId': result.public_id,
    },
    {
      omitUndefined: true,
      new: true,
    },
  );

  return { url: result.url, publicId: result.public_id };
};

export default changeAvatarService;
