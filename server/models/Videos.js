const mongoose = require('mongoose')

const videosSchema = new mongoose.Schema(
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
)

const Videos = mongoose.model('Videos', videosSchema)
module.exports = Videos
