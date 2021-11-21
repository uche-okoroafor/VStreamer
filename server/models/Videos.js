const mongoose = require('mongoose')
const Schema = mongoose.Schema

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
  comments: { type: Schema.Types.Array, ref: 'comments' },
  likes: { type: Schema.Types.Array, ref: 'likes' },
  dislikes: { type: Schema.Types.Array, ref: 'dislikes' },
  views: { type: Schema.Types.Array, ref: 'views' }
})

const Videos = mongoose.model('Videos', videosSchema)
module.exports = Videos
