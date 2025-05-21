// models/UpiPin.js
const mongoose = require('mongoose');

const UpiPinSchema = new mongoose.Schema({
  uniqueId: {
    type: String,
    required: true,
    index: true
  },
  pin: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 4
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('UpiPin', UpiPinSchema);
