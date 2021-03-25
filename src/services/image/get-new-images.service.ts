import { ImageStatus } from '../../constants';
import Image from '../../models/image/image.model';
import IImage from '../../models/image/types';

type GetNewImagesServiceType = (uid: string, page: string) => Promise<IImage[]>;

const getNewImagesService: GetNewImagesServiceType = async (uid, page) => {
  const newImages: IImage[] = await Image.aggregate([
    { $match: { status: ImageStatus.UPLOADED } },
    { $sort: { createdAt: -1 } },
    { $skip: (+page - 1) * 20 },
    { $limit: 20 },
    {
      $addFields: {
        liked: {
          $cond: { if: { $in: [uid, '$likes'] }, then: true, else: false },
        },
        views: { $size: '$views' },
        likes: { $size: '$likes' },
      },
    },
  ]);

  return newImages;
};

export default getNewImagesService;
