const express = require('express')
router = express.Router()
const {
  getAllVideosController,
  getUserVideosController,
  deleteVideoController
} = require('../controllers/videosController')

router.post('/all-videos', getAllVideosController)
router.post('/user-videos', getUserVideosController)
router.post('/delete-video', deleteVideoController)

module.exports = router
