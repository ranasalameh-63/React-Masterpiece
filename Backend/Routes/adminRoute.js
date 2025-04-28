const express = require('express');
const router = express.Router();
const { getAllUsers,
    deleteUser,
    getAdminStatistics,
    getPendingExperts,
    approveExpert,
    getAllBookings,
    getAllPayments,
    getAllMessages,
    replyToMessage } = require("../Controllers/adminController");

router.get('/statistics', getAdminStatistics);
router.get("/allUsers", getAllUsers);
router.delete("/delete/:id", deleteUser);
router.get("/pendingExperts", getPendingExperts);
router.patch("/approveExpert/:userId", approveExpert);
router.get('/allBookings', getAllBookings);
router.get("/payments", getAllPayments);
router.get("/messages", getAllMessages);
router.post("/reply", replyToMessage);

module.exports = router;
