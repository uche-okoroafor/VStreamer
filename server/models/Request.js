const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const requestSchema = new mongoose.Schema({
  ownerId: {
    type: ObjectId,
    required: true,
    ref: 'user',
  },
  sitterId: {
    type: ObjectId,
    required: true,
    ref: 'user',
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'declined'],
    default: 'pending',
  }, 
  paid: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Request", requestSchema);
