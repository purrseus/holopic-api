/* eslint-disable @typescript-eslint/no-explicit-any */
import { Schema, model, SchemaOptions, Model, Document } from 'mongoose';
import userProfileSchema from './user-profile';
import ISchema, { IStringSchema } from '../types';
import { UserStatus } from '../../constants';

interface IDefinition {
  status: IStringSchema<StringConstructor>;
  email: IStringSchema<StringConstructor>;
  phoneNumber: IStringSchema<StringConstructor>;
  uid: IStringSchema<StringConstructor>;
  lastLogin: ISchema<DateConstructor>;
  profile: ISchema<Schema<Document<any>, Model<Document<any>>, undefined>>;
}

const definition: IDefinition = {
  status: {
    type: String,
    enum: [UserStatus.ACTIVE, UserStatus.INACTIVE, UserStatus.DELETED],
    required: true,
    default: UserStatus.ACTIVE,
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
    required: true,
  },
  lastLogin: {
    type: Date,
    required: false,
  },
  profile: {
    type: userProfileSchema,
    required: true,
  },
};

const options: SchemaOptions = { timestamps: true };

const userSchema = new Schema(definition, options);

const User = model('User', userSchema);
export default User;
