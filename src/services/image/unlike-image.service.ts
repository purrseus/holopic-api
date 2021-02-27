import Image from '../../models/image/image.model';
import IImage from '../../models/image/types';
import IUser from '../../models/user/types';
import User from '../../models/user/user.model';

type UnlikeImageServiceType = (
  uid: string,
  imageId: string,
) => Promise<boolean>;

const unlikeImageService: UnlikeImageServiceType = async (uid, imageId) => {
  const updatedMylikesUser: IUser | null = await User.findOneAndUpdate(
    { uid },
    {
      $pullAll: { 'profile.myLikes': [imageId] },
    },
  );

  if (!updatedMylikesUser) {
    return false;
  }

  const unlikeImage: IImage | null = await Image.findOneAndUpdate(
    { publicId: imageId },
    {
      $pullAll: { likes: [uid] },
    },
    { new: true },
  );

  return !!unlikeImage;
};

export default unlikeImageService;
