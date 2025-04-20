const express = require("express");
const router = express.Router();
const { details, updateUserProfile, getUserBookings } = require("../Controllers/userController");
const upload = require("../Multer/multerConfig");


router.get("/details/:id", details);
router.put("/edit/:id", upload.single("profilePicture"), updateUserProfile);
router.get("/booking/:userId", getUserBookings);

module.exports = router;
