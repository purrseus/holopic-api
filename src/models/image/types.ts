import { Document } from 'mongoose';
import { ImageStatus } from '../../constants';
import IUser from '../user/types';

export default interface IImage extends Document {
  status?: ImageStatus;
  title?: string;
  publicId?: string;
  url?: string;
  width?: number;
  height?: number;
  user?: string;
  tags?: string[] | string;
  views?: string[] | number;
  likes?: string[] | number;
  liked?: boolean;
  likeIndex?: number;
  createdAt?: string;
  updatedAt?: string;
  userInfo?: IUser[];
}
