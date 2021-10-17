const express = require('express')
router = express.Router()
const {
  uploadVideoDetailsController,
  uploadVideoController
} = require('../controllers/uploadVideoController')

router.post('/video_details', uploadVideoDetailsController)
router.post('/:videoId', uploadVideoController)

module.exports = router
