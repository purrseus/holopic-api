import { Document, Model, Schema } from 'mongoose';
import { UserGender } from '../../constants';
import ISchema, { IStringSchema } from '../types';

interface IDefinition {
  fullName: IStringSchema<StringConstructor>;
  username: IStringSchema<StringConstructor>;
  avatar: ISchema<Schema<Document<any>, Model<Document<any>>, undefined>>;
  gender: IStringSchema<StringConstructor>;
  bio: IStringSchema<StringConstructor>;
  location: IStringSchema<StringConstructor>;
  myLikes: ISchema<StringConstructor[]>;
  following: ISchema<StringConstructor[]>;
  followers: ISchema<StringConstructor[]>;
  myShots: ISchema<StringConstructor[]>;
}

const avatarSchema = new Schema({
  url: {
    type: String,
    required: true,
    default:
      'https://res.cloudinary.com/holopic/image/upload/v1614434435/default-avatar_fjtr87.jpg',
  },
  publicId: {
    type: String,
    required: false,
    default: '',
  },
});

const definition: IDefinition = {
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
    type: avatarSchema,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: [UserGender.NA, UserGender.MALE, UserGender.FEMALE],
    default: UserGender.NA,
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
    required: false,
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
};

const userProfileSchema = new Schema(definition);

export default userProfileSchema;
