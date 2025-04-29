const express = require('express');
const router = express.Router();
const upload = require("../Multer/multerConfig");      
const { getAllUsers,
    deleteUser,
    getAdminStatistics,
    getPendingExperts,
    approveExpert,
    getAllBookings,
    getAllPayments,
    getAllMessages,
    replyToMessage,
    updateUser } = require("../Controllers/adminController");
const {adminMiddleware} = require ("../Middlewares/authMiddleware")

router.get('/statistics', getAdminStatistics);
router.get("/allUsers", getAllUsers);
router.delete("/delete/:id", deleteUser);
router.get("/pendingExperts", getPendingExperts);
router.patch("/approveExpert/:userId", approveExpert);
router.get('/allBookings', getAllBookings);
router.get("/payments", getAllPayments);
router.get("/messages", getAllMessages);
router.post("/reply", replyToMessage);
router.patch("/details/:id", upload.single("profilePicture"), updateUser);
module.exports = router;
