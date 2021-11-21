const express = require('express')
const router = express.Router()
const {
  uploadImageController,
  deleteImageController,
  downloadImageController
} = require('../controllers/imageController')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

router
  .route('/upload-image')
  .post(upload.single('image'), uploadImageController)

// router.post('/upload-image', upload.single('image'), uploadImageController)
router.get('/download-image/:key', downloadImageController)
router.delete('/delete-image', deleteImageController)

module.exports = router
