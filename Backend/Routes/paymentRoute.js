// /routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const paymentController = require('../Controllers/paymentController');
const authMiddleware = require("../Middlewares/authMiddleware");


router.post('/pay',authMiddleware ,paymentController.createPayment);
router.get('/all', paymentController.getAllPayments);

module.exports = router;
