const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  expertId: { type: mongoose.Schema.Types.ObjectId, ref: "Expert", required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ["pending", "confirmed", "canceled"], default: "pending" }
});

const Booking = mongoose.model("Bookings", bookingSchema);
module.exports = Booking;
