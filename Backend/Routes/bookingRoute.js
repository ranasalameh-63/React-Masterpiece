const express = require('express');
const router = express.Router();
const bookingsController = require('../Controllers/bookingController');
const { authMiddleware } = require('../Middlewares/authMiddleware');

router.post('/create',authMiddleware, bookingsController.createBooking);
router.get('/all/:id', bookingsController.getBookings);
router.get('/get/:id', bookingsController.getBookingById);

module.exports = router;
