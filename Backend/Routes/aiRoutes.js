// routes/aiRoutes.js
const express = require('express');
const router = express.Router();
const aiController = require('../Controllers/aiController');

router.post('/ask', aiController.getAIResponse);

module.exports = router;
