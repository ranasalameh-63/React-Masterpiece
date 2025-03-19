const mongoose = require("mongoose");

const videoHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  videoId: { type: mongoose.Schema.Types.ObjectId, ref: "Video", required: true },
  watchedAt: { type: Date, default: Date.now }
});

const VideoHistory = mongoose.model("VideoHistory", videoHistorySchema);
module.exports = VideoHistory;
