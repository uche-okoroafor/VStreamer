const mongoose = require('mongoose')

const userData = new mongoose.Schema(
  {
    videos: [
      {
        videoSource: {
          type: 'string',
          required: false
        },
        videoTitle: {
          type: 'string',
          required: false
        },
        views: {
          type: 'string',
          required: false
        },
        videoId: {
          type: 'string',
          required: false
        },
        videoDuration: {
          type: 'string',
          required: false
        },
        comments: {
          type: 'string',
          required: false
        },
        likes: {
          type: 'string',
          required: false
        }
      }
    ],
    userPhoto: {
      type: 'string',
      required: false
    }
  },
  { timestamps: true }
)

const UserData = mongoose.model('profile', userData)
module.exports = UserData
