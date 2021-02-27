import { Request } from 'express';
import multer, { Multer, StorageEngine, FileFilterCallback } from 'multer';
import path from 'path';
import { ROOT_DIR } from '../constants/index';

const fileName: number = Date.now() + Math.ceil(Math.random() * 100);

const storage: StorageEngine = multer.diskStorage({
  destination: (_, __, callback) => {
    callback(null, path.join(ROOT_DIR, 'uploads/images'));
  },
  filename: (_, { originalname }, callback) => {
    callback(null, `${fileName}.${originalname.split('.').slice(-1)[0]}`);
  },
});

const fileFilter = (
  _: Request,
  { originalname }: Express.Multer.File,
  callback: FileFilterCallback,
) => {
  if (!originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    callback(null, false);
  } else {
    callback(null, true);
  }
};

const upload: Multer = multer({
  storage: storage,
  limits: { fileSize: 10_000_000 },
  fileFilter,
});

export default upload;
