const { Schema } = require('mongoose');

module.exports = new Schema({
  fullName: {
    type: String,
    required: false,
    default: '',
    match: /^[\w\s]+$/g,
    minLength: 0,
    maxLength: 64,
  },
  username: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 16,
  },
  avatar: {
    type: String,
    required: true,
    default: 'images/default-avatar.jpg',
  },
  gender: {
    type: String,
    require: true,
    enum: ['N/A', 'MALE', 'FEMALE'],
    default: 'N/A',
  },
  bio: {
    type: String,
    required: false,
    default: '',
    minLength: 0,
    maxLength: 255,
  },
  location: {
    type: String,
    require: false,
    default: '',
  },
  likedShots: {
    type: [String],
    required: true,
    select: false,
  },
  followers: {
    type: [String],
    required: true,
    select: false,
  },
  following: {
    type: [String],
    required: true,
    select: false,
  },
  shots: {
    type: [String],
    required: true,
    select: false,
  },
});
