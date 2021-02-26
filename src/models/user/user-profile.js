const { Schema } = require('mongoose');

module.exports = new Schema({
  fullName: {
    type: String,
    required: false,
    default: '',
    minLength: 0,
    maxLength: 64,
  },
  username: {
    type: String,
    required: true,
    minLength: 4,
    maxLength: 32,
  },
  avatar: {
    type: String,
    required: true,
    default: 'default-avatar.jpg',
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
    minLength: 0,
    maxLength: 255,
  },
  myLikes: {
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
  myShots: {
    type: [String],
    required: true,
    select: false,
  },
});
