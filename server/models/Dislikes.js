const mongoose = require('mongoose')

const likesSchema = new mongoose.Schema({
  dislikeId: { type: 'string' },
  username: { type: 'string' },
  userId: { type: 'string' }
})

const Dislikes = mongoose.model('dislikes', likesSchema)
module.exports = Dislikes
