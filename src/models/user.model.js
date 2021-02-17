const { Schema, model } = require('mongoose');

const userTokenSchema = new Schema({
  accessToken: {
    type: String,
    required: false,
  },
  refreshToken: {
    type: String,
    required: false,
  },
  deviceId: {
    type: String,
    required: false,
  },
});

const userProfileSchema = new Schema({
  name: {
    type: String,
    required: false,
    minLength: 0,
    maxLength: 16,
  },
  username: {
    type: String,
    required: true,
    match: /^@/g,
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

const userSchema = new Schema({
  status: {
    type: String,
    enum: ['ACTIVE', 'INACTIVE', 'DELETED'],
    required: true,
    default: 'INACTIVE',
  },
  email: {
    type: String,
    required: false,
    minLength: 3,
    maxLength: 256,
  },
  phoneNumber: {
    type: String,
    required: true,
    match: /^\+\d{2,20}$/g,
  },
  uid: {
    type: String,
    require: true,
  },
  lastLogin: {
    type: Date,
    required: false,
  },
  createAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  updateAt: {
    type: Date,
    required: false,
  },
  deletedAt: {
    type: Date,
    required: false,
  },
  token: {
    type: userTokenSchema,
    required: false,
  },
  userProfile: {
    type: userProfileSchema,
    required: false,
  },
});

const User = model('User', userSchema);
module.exports = User;
