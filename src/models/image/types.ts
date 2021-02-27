import { Document } from 'mongoose';
import { ImageStatus } from '../../constants';

export default interface IImage extends Document {
  status?: ImageStatus;
  title?: string;
  publicId?: string;
  url?: string;
  user?: string;
  tags?: string[];
  views?: string[];
  likes?: string[];
  liked?: boolean;
  likeIndex?: number;
  viewCount?: number;
}
