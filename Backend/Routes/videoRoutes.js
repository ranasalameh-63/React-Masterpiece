const express = require("express");
const router = express.Router();

const {
  getVideosByCategory,
  getAllVideos,
  getRecentVideos
} = require("../Controllers/videoController");

// Routes
router.get("/category/:categoryName", getVideosByCategory);
router.get("/all", getAllVideos);
router.get("/recent", getRecentVideos);

module.exports = router;
