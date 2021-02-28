import Image from '../../models/image/image.model';

type ViewImageServiceType = (uid: string, imageId: string) => Promise<void>;

const viewImageService: ViewImageServiceType = async (uid, imageId) => {
  const watched: boolean = await Image.exists({
    publicId: imageId,
    views: uid,
  });

  if (watched) {
    return;
  }

  await Image.updateOne(
    { publicId: imageId },
    {
      $push: { views: uid },
    },
  );
};

export default viewImageService;
