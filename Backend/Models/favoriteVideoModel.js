const mongoose = require("mongoose");

const favoriteVideoSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  videoId: { type: mongoose.Schema.Types.ObjectId, ref: "Video", required: true },
  isFavorite: { type: Boolean, default: false }});

const FavoriteVideo = mongoose.model("FavoriteVideo", favoriteVideoSchema);
module.exports = FavoriteVideo;
