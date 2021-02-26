const { Schema, model } = require('mongoose');

const imageSchema = new Schema(
  {
    status: {
      type: String,
      enum: ['UPLOADED', 'DELETED'],
      required: true,
      default: 'UPLOADED',
    },
    title: {
      type: String,
      required: true,
      minLength: 0,
      maxLength: 64,
    },
    publicId: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: false,
    },
    user: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    likes: {
      type: [String],
      required: true,
      select: false,
    },
  },
  { timestamps: true },
);

const Image = model('Image', imageSchema);
module.exports = Image;
