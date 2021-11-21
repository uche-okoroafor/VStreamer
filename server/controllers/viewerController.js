const User = require('../models/User')
const asyncHandler = require('express-async-handler')

// @route POST /like
// @desc Addes like to the video
// @access Private
exports.addViewerController = asyncHandler(async (req, res, next) => {
  console.log('here')
  const loggedInUserId = req.user.id
  const { loggedInUsername, userId, videoId } = req.body
  const addStatus = await User.updateOne(
    {
      _id: userId,
      'videos.videoId': videoId
    },
    {
      $push: {
        'videos.$.views': { username: loggedInUsername, userId: loggedInUserId }
      }
    }
  )
  if (addStatus.nModified === 1) {
    return res.status(200).json({ success: true })
  }
  res.status(500)
  throw new Error('something went wrong')
})
