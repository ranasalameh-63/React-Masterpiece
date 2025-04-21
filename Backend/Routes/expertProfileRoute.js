const express = require('express');
const router = express.Router();
const {
  getCurrentExpert,
  updateCurrentExpert, 
  getExpertBookings,
} = require("../Controllers/expertProfileController");
const upload = require("../Multer/multerConfig");


router.get("/get/:id", getCurrentExpert);
router.put("/update/:id",upload.single("profileImage"), updateCurrentExpert);
router.get("/bookings/:id", getExpertBookings);


module.exports = router;
