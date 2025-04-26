const express = require('express');
const router = express.Router();
const { getAllUsers,
    deleteUser,
    getAdminStatistics,
    getPendingExperts,
    approveExpert } = require("../Controllers/adminController");

router.get('/statistics', getAdminStatistics);
router.get("/allUsers", getAllUsers);
router.delete("/delete/:id", deleteUser);
router.get("/pendingExperts", getPendingExperts);
router.patch("/approveExpert/:userId", approveExpert);


module.exports = router;
