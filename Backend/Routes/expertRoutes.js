const express = require("express");
const router = express.Router();
const expertController = require("../Controllers/expertsController");
const authMiddleware = require("../Middlewares/authMiddleware");
const upload = require("../Multer/multerConfig"); 

router.post("/add", authMiddleware, upload.single("profileImage"), expertController.createExpert);
router.get("/all", expertController.getAllExperts);
router.get("/:id", expertController.getExpertById);

module.exports = router;
