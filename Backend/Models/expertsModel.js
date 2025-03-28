const mongoose = require("mongoose");

const expertSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  phoneNumber: { type: String, required: true },
  location: { type: String, required: true },
  experienceYears: { type: Number, required: true },
  aboutYourself: { type: String },
  skills: { type: [String] },
  availability: {
    type: [String],
    enum: ["weekdays", "weekends", "evenings"],
    default: [],
  },
  hourlyRate: { type: Number, required: true },
  profileImage: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Expert = mongoose.model("Experts", expertSchema);
module.exports = Expert;
