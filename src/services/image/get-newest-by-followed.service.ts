import { ImageStatus } from '../../constants';
import Image from '../../models/image/image.model';
import IImage from '../../models/image/types';
import User from '../../models/user/user.model';

type GetNewestByFollowedType = (uid: string, page: string) => Promise<IImage[]>;

const getNewestByFollowedService: GetNewestByFollowedType = async (
  uid,
  page,
) => {
  const following = await User.aggregate([
    { $match: { uid } },
    {
      $project: {
        _id: 0,
        following: '$project.following',
      },
    },
  ]);

  const followByUser: string[] | undefined = following[0]?.following;

  if (!followByUser?.length) {
    return [];
  }

  const newestByFollowed: IImage[] = await Image.aggregate([
    { $match: { user: { $in: followByUser }, status: ImageStatus.UPLOADED } },
    { $sort: { createAt: -1 } },
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

  return newestByFollowed;
};

export default getNewestByFollowedService;
