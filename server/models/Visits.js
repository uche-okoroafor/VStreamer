const mongoose = require('mongoose')

const visitSchema = new mongoose.Schema({
  link: { type: String },
  visitTime: {
    type: Date,
    default: Date.now
  },
  screenSize: { type: String }
})

const Visit = mongoose.model('visit', visitSchema)
module.exports = Visit
