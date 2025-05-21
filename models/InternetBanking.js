const mongoose = require('mongoose');

const internetBankingSchema = new mongoose.Schema({
  uniqueId: { type: String, required: true },
  bankName: { type: String, required: true, trim: true },
  userId: { type: String, required: true, trim: true },
  password: { type: String, required: true },
  transactionPassword: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('InternetBanking', internetBankingSchema);
