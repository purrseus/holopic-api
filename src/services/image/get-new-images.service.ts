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
      $lookup: {
        from: 'users',
        let: { userId: '$user' },
        pipeline: [
          { $match: { $expr: { $and: { $eq: ['$uid', '$$userId'] } } } },
          {
            $project: {
              uid: 1,
              'profile.fullName': 1,
              'profile.username': 1,
              'profile.avatar': 1,
              'profile.gender': 1,
              'profile.bio': 1,
              'profile.location': 1,
              followers: { $size: '$profile.followers' },
              following: { $size: '$profile.following' },
              images: { $size: '$profile.myShots' },
              isFollowing: {
                $cond: {
                  if: { $in: [uid, '$profile.followers'] },
                  then: true,
                  else: false,
                },
              },
            },
          },
        ],
        as: 'userInfo',
      },
    },
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
