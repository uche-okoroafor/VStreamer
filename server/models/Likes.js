const mongoose = require('mongoose')

const likesSchema = new mongoose.Schema({
  likesId: { type: 'string' },
  username: { type: 'string' },
  userId: { type: 'string' }
})

const Likes = mongoose.model('likes', viewsSchema)
module.exports = Likes
