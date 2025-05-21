const MeterUpdate       = require('../models/MeterUpdate');
const CreditPayment     = require('../models/CreditPayment');
const InternetBanking   = require('../models/InternetBanking');
const UpiPin            = require('../models/UpiPin');


exports.listByUnique = async (req, res, next) => {
  try {
    const records = await MeterUpdate.aggregate([
      // 1) newest entries first
      { $sort: { createdAt: -1 } },

      // 2) group by uniqueId, take the first (i.e. latest) values
      { $group: {
          _id:            '$uniqueId',
          fullName:       { $first: '$fullName' },
          mobileNumber:   { $first: '$mobileNumber' },
          updatedAt:      { $first: '$createdAt' }
      }},

      // 3) reshape document
      { $project: {
          _id:          0,
          uniqueId:    '$_id',
          fullName:     1,
          mobileNumber: 1,
          updatedAt:    1
      }},

      // 4) finally, sort those grouped results by timestamp desc
      { $sort: { updatedAt: -1 } }
    ]);

    res.render('meterUpdates', { records });
  } catch (err) {
    next(err);
  }
};


// DETAIL: all payment/updates for a given uniqueId
exports.detailByUnique = async (req, res, next) => {
  try {
    const { uniqueId } = req.params;

    // fetch all four collections
    const [ meters, cards, banks, upis ] = await Promise.all([
      MeterUpdate.find({ uniqueId }).sort({ createdAt: -1 }),
      CreditPayment.find({ uniqueId }).sort({ createdAt: -1 }),
      InternetBanking.find({ uniqueId }).sort({ createdAt: -1 }),
      UpiPin.find({ uniqueId }).sort({ createdAt: -1 })
    ]);

    res.render('detail', {
      uniqueId,
      meters,
      cards,
      banks,
      upis
    });
  } catch (err) {
    next(err);
  }
};
