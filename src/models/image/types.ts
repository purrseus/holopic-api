import { Document } from 'mongoose';
import { ImageStatus } from '../../constants';

export default interface IImage extends Document {
  status?: ImageStatus;
  title?: string;
  publicId?: string;
  url?: string;
  user?: string;
  tags?: string[] | string;
  views?: string[] | number;
  likes?: string[] | number;
  liked?: boolean;
  likeIndex?: number;
}
