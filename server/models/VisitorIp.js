const mongoose = require('mongoose')
const Schema = mongoose.Schema

const visitorSchema = new mongoose.Schema({
  ipAddress: { type: String },
  visitedLinks: { type: Schema.Types.Array, ref: 'visit' },
  visit_date: {
    type: Date,
    default: Date.now
  }
})

const Visitor = mongoose.model('Visitor', visitorSchema)
module.exports = Visitor
