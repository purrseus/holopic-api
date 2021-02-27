import User from '../../models/user/user.model';
import Image from '../../models/image/image.model';
import IImage from '../../models/image/types';

type EditImageServiceType = (
  uid: string,
  imageId: string,
  title: string,
  tags: string[],
) => Promise<IImage | null>;

const editImageService: EditImageServiceType = async (
  uid,
  imageId,
  title,
  tags,
) => {
  const isAuthorized: boolean = await User.exists({
    uid: uid,
    'profile.myShots': imageId,
  });

  if (!isAuthorized) {
    return null;
  }

  const editedImage: IImage | null = await Image.findOneAndUpdate(
    { publicId: imageId },
    {
      title: title,
      tags: tags,
    },
    { omitUndefined: true, new: true },
  );

  return editedImage;
};

export default editImageService;
