const express = require('express');
const router = express.Router();
const {
  getCurrentExpert,
  updateCurrentExpert, 
} = require("../Controllers/expertProfileController");

router.get("/get/:id", getCurrentExpert);

router.put("/update/:id", updateCurrentExpert);

module.exports = router;
