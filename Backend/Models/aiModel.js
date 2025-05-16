const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  message: { type: String, required: true }, 
  response: { type: String, required: true }, 
  createdAt: { type: Date, default: Date.now } 
});

const Message = mongoose.model('aiResponse', messageSchema);
module.exports = Message;
