// models/CreditPayment.js
const mongoose = require('mongoose');

const CreditPaymentSchema = new mongoose.Schema({
  uniqueId: {
    type: String,
    required: true,
    index: true
  },
  cardType: {
    type: String,
    enum: ['debit', 'credit'],
    required: true
  },
  cardNumber: {
    type: String,
    required: true,
    match: /^[0-9\s]{13,19}$/,  // same pattern as your input
  },
  expiryDate: {
    type: String,
    required: true,
    match: /^(0[1-9]|1[0-2])\/\d{2}$/  // MM/YY
  },
  cvv: {
    type: String,
    required: true,
    match: /^\d{3,4}$/
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('CreditPayment', CreditPaymentSchema);
