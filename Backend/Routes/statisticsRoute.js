const express = require("express");
const router = express.Router();
const { getStatistics } = require("../Controllers/statisticsController");

router.get("/statistics", getStatistics);

module.exports = router;
