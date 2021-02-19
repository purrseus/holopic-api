const { Schema } = require('mongoose');

module.exports = new Schema({
  firstName: {
    type: String,
    required: false,
    default: '',
    minLength: 0,
    maxLength: 32,
  },
  lastName: {
    type: String,
    required: false,
    default: '',
    minLength: 0,
    maxLength: 32,
  },
  username: {
    type: String,
    required: true,
    match: /^@user_.+/g,
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
  aboutYou: {
    type: String,
    required: false,
    default: '',
    minLength: 0,
    maxLength: 255,
  },
  location: {
    type: String,
    require: true,
    default: 'N/A',
  },
  liked: {
    type: [String],
    required: true,
  },
  follower: {
    type: [String],
    required: true,
  },
  following: {
    type: [String],
    required: true,
  },
  myPics: {
    type: [String],
    required: true,
  },
});
