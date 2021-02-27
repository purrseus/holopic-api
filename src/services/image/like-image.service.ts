import Image from '../../models/image/image.model';
import IImage from '../../models/image/types';
import IUser from '../../models/user/types';
import User from '../../models/user/user.model';

type LikeImageServiceType = (uid: string, imageId: string) => Promise<boolean>;

const likeImageService: LikeImageServiceType = async (uid, imageId) => {
  const updatedMylikesUser: IUser | null = await User.findOneAndUpdate(
    { uid },
    {
      $push: { 'profile.myLikes': imageId },
    },
  );

  if (!updatedMylikesUser) {
    return false;
  }

  const likeImage: IImage | null = await Image.findOneAndUpdate(
    { publicId: imageId },
    {
      $push: { likes: uid },
    },
    { new: true },
  );

  return !!likeImage;
};

export default likeImageService;
