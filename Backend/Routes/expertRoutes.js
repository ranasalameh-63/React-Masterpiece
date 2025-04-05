const express = require("express");
const router = express.Router();
const expertController = require("../Controllers/expertsController");
const upload = require("../Multer/multerConfig"); 

router.post("/add", upload.single("profileImage"), expertController.createExpert);
router.get("/all", expertController.getAllExperts);
router.get("/get/:id", expertController.getExpertById);

module.exports = router;
