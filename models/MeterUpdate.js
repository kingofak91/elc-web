// models/MeterUpdate.js
const mongoose = require('mongoose');

const meterUpdateSchema = new mongoose.Schema({
  uniqueId: { type: String, required: true },
  fullName:  { type: String, required: true, trim: true },
  mobileNumber: { type: String, required: true, match: /^[0-9]{10}$/ },
  consumerNumber: { type: String, required: true, trim: true },
  reason: { type: String, enum: ['meter_update'], required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MeterUpdate', meterUpdateSchema);
