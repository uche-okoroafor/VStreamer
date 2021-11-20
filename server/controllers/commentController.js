const User = require('../models/User')
const asyncHandler = require('express-async-handler')
const { v4: uuidv4 } = require('uuid')

// @route POST /comment
// @desc Add comment to the video
// @access Private
exports.addCommentController = asyncHandler(async (req, res, next) => {
  const loggedInUserId = req.user.id
  const { loggedInUsername, userId, videoId, comment } = req.body

  const addStatus = await User.updateOne(
    {
      _id: userId,
      'videos.videoId': videoId
    },
    {
      $push: {
        'videos.$.comments': {
          username: loggedInUsername,
          userId: loggedInUserId,
          comment: comment,
          commentId: uuidv4(),
          date: Date.now()
        }
      }
    }
  )
  if (addStatus.nModified === 1) {
    return res.status(200).json({ success: true })
  }
  res.status(500)
  throw new Error('something went wrong')
})

// @route POST /comment
// @desc Addes comment to the video
// @access Private
exports.editCommentController = asyncHandler(async (req, res, next) => {
  const { userId, videoId, comment, commentId } = req.body

  const editStatus = await User.updateOne(
    {
      _id: userId,
      'videos.comments.commentId': commentId
    },
    {
      $set: {
        'videos.$[video].comments.$[comment].comment': comment
      }
    },
    {
      arrayFilters: [
        { 'comment.commentId': commentId },
        { 'video.videoId': videoId }
      ]
    }
  )
  if (editStatus.nModified === 1) {
    return res.status(200).json({ success: true })
  }
  res.status(500)
  throw new Error('something went wrong')
})

// @route POST /comment
// @desc Addes comment to the video
// @access Private
exports.deleteCommentController = asyncHandler(async (req, res, next) => {
  const { userId, videoId, commentId } = req.body
  const deleteStatus = await User.updateOne(
    {
      _id: userId,
      'videos.comments.commentId': commentId
    },
    {
      $pull: {
        'videos.$[video].comments': { commentId: commentId }
      }
    },
    {
      arrayFilters: [{ 'video.videoId': videoId }]
    }
  )

  if (deleteStatus.nModified === 1) {
    return res.status(200).json({ success: true })
  }

  res.status(500)
  throw new Error('No file provided!')
})
