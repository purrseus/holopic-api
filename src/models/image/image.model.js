const { Schema, model } = require('mongoose');

const imageSchema = new Schema({
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
  url: {
    type: String,
    required: true,
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
});

const Image = model('Image', imageSchema);
module.exports = Image;
