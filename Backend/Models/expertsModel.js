const mongoose = require("mongoose");

const expertSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  specialization: { type: String, required: true },
  experienceYears: { type: Number, required: true }, 
  location: { type: String, required: true }, 
  bio: { type: String },
  status: { type: Boolean, default: "pending" }, 
  createdAt: { type: Date, default: Date.now }
});

const Expert = mongoose.model("Experts", expertSchema);
module.exports = Expert;
