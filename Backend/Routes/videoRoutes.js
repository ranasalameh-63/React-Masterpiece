const express = require("express");
const router = express.Router();
const { getVideosByCategory } = require("../Controllers/videoController");

router.get("/category/:categoryName", getVideosByCategory);

module.exports = router;
