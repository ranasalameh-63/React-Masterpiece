const express = require('express');
const router = express.Router();
const {
  getCurrentExpert,
  updateCurrentExpert, 
  getExpertBookings,
  updateBookingStatus,
} = require("../Controllers/expertProfileController");
const upload = require("../Multer/multerConfig");


router.get("/get/:id", getCurrentExpert);
router.put("/update/:id",upload.single("profileImage"), updateCurrentExpert);
router.get("/bookings/:id", getExpertBookings);
router.put("/update-status", updateBookingStatus);

module.exports = router;
