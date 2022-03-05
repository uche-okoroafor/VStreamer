const mongoose = require('mongoose')

const visitorSchema = new mongoose.Schema({
  ipAddress: { type: String },
  visit_date: {
    type: Date,
    default: Date.now
  },
})

const Visitor = mongoose.model('Visitor', visitorSchema)
module.exports = Visitor
