import { Document } from 'mongoose';
import { UserStatus } from '../../constants/index';

export interface IProfile {
  fullName: string;
  username: string;
  avatar: string;
  gender: string;
  bio: string;
  location: string;
}

export default interface IUser extends Document {
  status?: UserStatus;
  uid?: string;
  profile?: IProfile;
  lastLogin?: Date | number;
  following?: boolean | number;
}

export interface IAccount extends IUser {
  email?: string;
  phoneNumber: string;
  myLikes: number;
  followers: number;
}
