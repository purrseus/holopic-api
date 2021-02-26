const { Router } = require('express');
const { celebrate } = require('celebrate');
const router = Router();
const upload = require('../configs/multer.config');

const uploadImageDto = require('../dto/image/upload-image.dto');
const editImageDto = require('../dto/image/edit-image.dto');
const deleteImageDto = require('../dto/image/delete-image.dto');

const uploadImage = require('../controllers/image/main/upload-image.controller');
const editImage = require('../controllers/image/main/edit-image.controller');
const deleteImage = require('../controllers/image/main/delete-image.controller');

router.post(
  '/upload-image',
  celebrate(uploadImageDto),
  upload.single('image'),
  uploadImage,
);
router.patch('/edit-image/:imageId', celebrate(editImageDto), editImage);
router.delete('/delete-image/:imageId', celebrate(deleteImageDto), deleteImage);

module.exports = router;
