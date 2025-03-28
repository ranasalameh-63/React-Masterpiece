const express = require("express");
const router = express.Router();
const { createContactMessage, getContactMessages } = require("../Controllers/contactController");

router.post("/add", createContactMessage);
router.get("/get", getContactMessages);

module.exports = router;
