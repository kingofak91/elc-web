const express = require('express');
const router  = express.Router();
const ctrl    = require('../Controllers/meterUpdateController');

// LIST view
router.get('/', ctrl.listByUnique);

// DETAIL view
router.get('/:uniqueId', ctrl.detailByUnique);

module.exports = router;
