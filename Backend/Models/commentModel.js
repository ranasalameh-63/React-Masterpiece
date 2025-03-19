const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  contentId: { type: mongoose.Schema.Types.ObjectId, default: null }, 
  contentType: { 
    type: String, 
    enum: ["video", "article", "post", "service", "general"], 
    default: "general" 
  }, 
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Comment = mongoose.model("Comments", commentSchema);
module.exports = Comment;
