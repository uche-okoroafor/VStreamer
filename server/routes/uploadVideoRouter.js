const express = require('express')
router = express.Router()
const {
  uploadVideoDetailsController,
  uploadVideoController
} = require('../controllers/uploadVideoController')
const { upload } = require('../middleware/multerConfig')

router.post('/video-details', uploadVideoDetailsController)
router.post('/upload-video', upload, uploadVideoController)
module.exports = router
