const express = require("express");
const router = express.Router();
const {
  checkoutController,
  stripeController,
} = require("../Controllers/paymentController");

router.post("/paycash", checkoutController);
router.post("/paypaypal", checkoutController);
// router.post("/create-stripe-session", stripeController);

module.exports = router;
