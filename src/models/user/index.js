const { Schema, model } = require('mongoose');
const userProfileSchema = require('./user-profile');

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
    maxLength: 255,
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
  userProfile: {
    type: userProfileSchema,
    required: false,
  },
});

const User = model('User', userSchema);
module.exports = User;
