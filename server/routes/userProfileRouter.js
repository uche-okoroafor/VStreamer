const express = require('express')
const router = express.Router()
const {
  profile,
  getProfile,
  getAllProfiles
} = require('../controllers/userProfileController')

router.patch('/:userId', profile)
router.get('/get-profile/:userId', getProfile)
router.get('/get-all-profiles/', getAllProfiles)

module.exports = router
