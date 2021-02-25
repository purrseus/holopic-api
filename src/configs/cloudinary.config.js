const cloudinary = require('cloudinary').v2;

module.exports = {
  config: () => {
    cloudinary.config({
      cloud_name: 'holopic',
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  },
};
