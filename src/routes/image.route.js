const { Router } = require('express');
const router = Router();
const upload = require('../configs/multer.config');

const uploadImage = require('../controllers/image/upload-image.controller');

router.post('/upload-image', upload.single('image'), uploadImage);

module.exports = router;
