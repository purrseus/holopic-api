const { Schema } = require('mongoose');

module.exports = new Schema({
  name: {
    type: String,
    required: true,
    default: '',
    minLength: 0,
    maxLength: 32,
  },
  username: {
    type: String,
    required: true,
    match: /^@user_\d+/g,
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
