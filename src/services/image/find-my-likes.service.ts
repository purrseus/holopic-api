import { ImageStatus } from '../../constants';
import Image from '../../models/image/image.model';
import IImage from '../../models/image/types';

type FindMyLikesServiceType = (uid: string, page: string) => Promise<IImage[]>;

const findMyLikesService: FindMyLikesServiceType = async (uid, page) => {
  const myLikes: IImage[] = await Image.aggregate([
    { $match: { likes: uid, status: ImageStatus.UPLOADED } },
    {
      $addFields: {
        likeIndex: { $indexOfArray: ['$likes', uid] },
        liked: {
          $cond: { if: { $in: [uid, '$likes'] }, then: true, else: false },
        },
        viewCount: { $size: '$views' },
      },
    },
    { $sort: { likeIndex: -1 } },
    { $skip: (+page - 1) * 20 },
    { $limit: 20 },
  ]);

  return myLikes;
};

export default findMyLikesService;
