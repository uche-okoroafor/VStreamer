const mongoose = require('mongoose')

const videosSchema = new mongoose.Schema({
  videoSource: {
    type: 'string',
    required: false
  },
  username: {
    type: 'string',
    required: false
  },
  userId: {
    type: 'string',
    required: false
  },
  datePosted: {
    type: Date,
    required: false
  },
  videoTitle: {
    type: 'string',
    required: false,
    lowercase: true
  },
  views: {
    type: 'string',
    required: false
  },
  videoId: {
    type: 'string',
    required: false
  },
  duration: {
    type: 'string',
    required: false
  },
  videoTag: {
    type: 'string',
    required: false
  },
  videoCategory: {
    type: 'string',
    required: false
  },
  comments: [
    {
      username: { type: 'string' },
      userId: { type: 'string' },
      comment: { type: 'string' },
      date: { type: Date },
      commentId: { type: 'string' }
    }
  ],
  likes: [
    {
      username: { type: 'string' },
      userId: { type: 'string' },
      likeId: { type: 'string' }
    }
  ],
  dislikes: [
    {
      username: { type: 'string' },
      userId: { type: 'string' },
      dislikeId: { type: 'string' }
    }
  ],
  views: [
    {
      username: { type: 'string' },
      userId: { type: 'string' }
    }
  ]
})

const Videos = mongoose.model('Videos', videosSchema)
module.exports = Videos
