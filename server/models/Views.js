const mongoose = require('mongoose')

const viewsSchema = new mongoose.Schema({
  username: { type: String },
  userId: { type: String, unique: true }
})

const Views = mongoose.model('views', viewsSchema)
module.exports = Views
