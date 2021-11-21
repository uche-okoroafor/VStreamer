const mongoose = require('mongoose')

const viewsSchema = new mongoose.Schema({
  viewId: { type: 'string' },
  username: { type: 'string' },
  userId: { type: 'string' }
})

const Views = mongoose.model('views', viewsSchema)
module.exports = Views
