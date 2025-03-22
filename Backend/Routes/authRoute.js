const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../Controllers/authController");  

// Register new user
router.post("/register", registerUser);

// Login existing user
router.post("/login", loginUser);

module.exports = router;
