const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  role: { type: String, enum: ["admin"], default: "admin" },
});

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
