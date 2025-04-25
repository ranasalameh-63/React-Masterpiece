const express = require('express');
const router = express.Router();
const { getVoucherByBookingId,createVoucher } = require('../Controllers/voucherController');


router.post('/create/:bookId', createVoucher);
router.get("/booking/:bookingId", getVoucherByBookingId);


module.exports = router;
