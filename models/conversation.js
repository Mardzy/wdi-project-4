const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  text: { type: String, required: true },
  from: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  read: { type: Boolean }
}, {
  timestamps: true
});

const conversationSchema = new mongoose.Schema({
  from: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  to: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  messages: [messageSchema]
});


module.exports = mongoose.model('Conversation', conversationSchema);
