import { Router } from 'express';
import { celebrate } from 'celebrate';
const router: Router = Router();
import upload from '../configs/multer.config';

import uploadImageDto from '../dto/image/upload-image.dto';
import editImageDto from '../dto/image/edit-image.dto';
import imageIdDto from '../dto/image/image-id.dto';
import pageDto from '../dto/page.dto';
import getImagesUserDto from '../dto/image/get-images-user.dto';
import searchDto from '../dto/search.dto';

import uploadImage from '../controllers/image/main/upload-image.controller';
import editImage from '../controllers/image/main/edit-image.controller';
import deleteImage from '../controllers/image/main/delete-image.controller';
import like from '../controllers/image/like/like.controller';
import unlike from '../controllers/image/like/unlike.controller';
import getMyImages from '../controllers/image/main/get-my-images.controller';
import getMyLikes from '../controllers/image/like/get-my-likes.controller';
import getNewImages from '../controllers/image/main/get-new-images.controller';
import getNewestByFollowed from '../controllers/image/main/get-newest-by-followed.controller';
import getImagesUser from '../controllers/image/search/get-images-user.controller';
import searchImages from '../controllers/image/search/search-images.controller';
import view from '../controllers/image/like/view.controller';

router.post(
  '/upload-image',
  celebrate(uploadImageDto),
  upload.single('image'),
  uploadImage,
);
router.patch('/edit-image/:imageId', celebrate(editImageDto), editImage);
router.delete('/delete-image/:imageId', celebrate(imageIdDto), deleteImage);
router.get('/my-images', celebrate(pageDto), getMyImages);
router.get('/new-images', celebrate(pageDto), getNewImages);
router.get('/newest-by-followed', celebrate(pageDto), getNewestByFollowed);

router.get('/like/:imageId', celebrate(imageIdDto), like);
router.get('/unlike/:imageId', celebrate(imageIdDto), unlike);
router.get('/my-likes', celebrate(pageDto), getMyLikes);
router.get('/view/:imageId', celebrate(imageIdDto), view);

router.get('/images', celebrate(getImagesUserDto), getImagesUser);
router.get('/search', celebrate(searchDto), searchImages);

export default router;
