const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  youtubeUrl: { type: String, required: true },
  thumbnailUrl: { type: String },
  expertId: { type: mongoose.Schema.Types.ObjectId, ref: "Expert", required: true },
  categories: [{ type: String, required: true }],
  tags: [{ type: String }],
  views: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

const Video = mongoose.models.Videos || mongoose.model("Videos", videoSchema);

module.exports = Video;
