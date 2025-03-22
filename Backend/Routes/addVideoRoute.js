const express = require("express");
const { addVideo, getVideosByCategory } = require("../Controllers/addVideoController");
const router = express.Router();
const authMiddleware = require ('../Middlewares/authMiddleware')

router.post("/add", authMiddleware, addVideo);
router.get("/category/:category", getVideosByCategory);

module.exports = router;
