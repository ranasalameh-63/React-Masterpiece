const mongoose = require("mongoose");
const AutoIncrementFactory = require('mongoose-sequence')(mongoose); 

const voucherSchema = new mongoose.Schema({
  voucherNumber: { type: Number, unique: true }, 
  amount: { type: Number, required: true },
  details: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  expertId: { type: mongoose.Schema.Types.ObjectId, ref: "Expert", required: true },
});

voucherSchema.plugin(AutoIncrementFactory, { inc_field: 'voucherNumber' });

const Voucher = mongoose.model("Voucher", voucherSchema);

module.exports = Voucher;
