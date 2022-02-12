const User = require('../models/User')
const asyncHandler = require('express-async-handler')
const Views = require('../models/Views')
const ObjectID = require('mongodb').ObjectID

// @route POST /like
// @desc Adds like to the video
// @access Private
exports.addViewerController = asyncHandler(async (req, res, next) => {
  const loggedInUserId = req.user.id
  const { loggedInUsername, userId, videoId } = req.body
  const videoObjectId = ObjectID(videoId)
  const viewer = new Views({
    username: loggedInUsername,
    userId: loggedInUserId
  })

  const findUser = await User.find(
    { _id: userId },
    {
      videos: {
        $elemMatch: { _id: videoObjectId }
      }
    }
  )

  if (findUser) {
    const viewerExist = await findUser[0].videos[0].views.filter(
      user => user.userId === loggedInUserId
    )

    if (viewerExist.length === 0) {
      const viewsList = [...findUser[0].videos[0].views, viewer]
      const addVideoViews = await User.updateOne(
        {
          _id: userId,
          'videos._id': videoObjectId
        },
        {
          $set: {
            'videos.$.views': viewsList
          }
        }
      )
      if (addVideoViews.nModified === 1) {
        return res.status(200).json({ success: true })
      }
    } else {
      return res.status(200).json({ success: false })
    }
  }

  res.status(500)
  throw new Error('something went wrong')
})
