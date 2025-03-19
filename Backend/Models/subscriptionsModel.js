const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  plan: { type: String, enum: ["basic", "premium", "pro"], required: true },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date, required: true },
  status: { type: String, enum: ["active", "expired"], default: "active" }
});

const Subscription = mongoose.model("Subscriptions", subscriptionSchema);
module.exports = Subscription;
