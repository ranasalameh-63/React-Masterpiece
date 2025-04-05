const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  expertId: { type: mongoose.Schema.Types.ObjectId, ref: "Expert", required: true },
  preferredDate: { type: Date, required: true },
  preferredTime: { type: String, required: true },
  serviceDetails: { type: String, required: false },
  status: { type: String, enum: ["pending", "confirmed", "canceled"], default: "pending" }
});

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
