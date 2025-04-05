const express = require('express');
const router = express.Router();
const voucherController = require('../Controllers/voucherController');


router.post('/create', voucherController.createVoucher);
// router.post('/pay', voucherController.processPayment);

module.exports = router;
