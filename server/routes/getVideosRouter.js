const express = require('express')
router = express.Router()
const {
  getAllVideosController,
  getUserVideosController
} = require('../controllers/getVideosController')

router.post('/all-videos', getAllVideosController)
router.post('/user-videos', getUserVideosController)

module.exports = router
