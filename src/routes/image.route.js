const { Router } = require('express');
const router = Router();
const upload = require('../configs/multer.config');

const verifyToken = require('../middlewares/verify-token.middleware');

const uploadImage = require('../controllers/image/upload-image.controller');

router.post('/upload-image', verifyToken, upload.single('image'), uploadImage);

module.exports = router;
