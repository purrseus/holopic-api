import Image from '../../models/image/image.model';
import IImage from '../../models/image/types';

type FindImagesServiceType = (
  uid: string,
  page: string,
  query: Record<string, string | Record<string, any> | RegExp>,
) => Promise<IImage[]>;

const findImagesService: FindImagesServiceType = async (uid, page, query) => {
  const myImages: IImage[] = await Image.aggregate([
    { $match: query },
    { $sort: { createAt: -1 } },
    { $skip: (+page - 1) * 20 },
    { $limit: 20 },
    {
      $addFields: {
        liked: {
          $cond: { if: { $in: [uid, '$likes'] }, then: true, else: false },
        },
        viewCount: { $size: '$views' },
      },
    },
  ]);

  return myImages;
};

export default findImagesService;
