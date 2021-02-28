import User from '../../models/user/user.model';
import Image from '../../models/image/image.model';
import { v2 as cloudinary } from 'cloudinary';
import { ImageStatus } from '../../constants/index';
import IImage from '../../models/image/types';

type DeleteImageServiceType = (
  uid: string,
  imageId: string,
) => Promise<IImage | null>;

const deleteImageService: DeleteImageServiceType = async (uid, imageId) => {
  const isAuthorized: boolean = await User.exists({
    uid: uid,
    'profile.myShots': imageId,
  });

  if (!isAuthorized) {
    return null;
  }

  const result: any = await cloudinary.uploader.destroy(imageId);

  if (result?.result !== 'ok') {
    return null;
  }

  const editedImage: IImage | null = await Image.findOneAndUpdate(
    { publicId: imageId },
    {
      status: ImageStatus.DELETED,
    },
    { new: true },
  );

  return editedImage;
};

export default deleteImageService;
