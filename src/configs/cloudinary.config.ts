import { v2 as cloudinary } from 'cloudinary';

interface ICloudinaryConfig {
  config: () => void;
}

const cloudinaryConfig: ICloudinaryConfig = {
  config: () => {
    cloudinary.config({
      cloud_name: 'holopic',
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  },
};

export default cloudinaryConfig;
