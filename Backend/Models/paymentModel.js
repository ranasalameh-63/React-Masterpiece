const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  paymentMethod: { type: String, enum: ["credit_card", "paypal", "cash", "cliq"], required: true },
  status: { type: String, enum: ["pending", "completed", "failed"], default: "pending" },
  voucherId: { type: mongoose.Schema.Types.ObjectId, ref: "Voucher", required: true },
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: "Booking", required: true },
  createdAt: { type: Date, default: Date.now }
});

const Payment = mongoose.model("Payment", paymentSchema);
module.exports = Payment;
