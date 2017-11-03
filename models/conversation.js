const mongoose = require('mongoose');
const moment = require('moment');


const messageSchema = new mongoose.Schema({
  text: { type: String, required: true },
  from: { type: mongoose.Schema.ObjectId, ref: 'User' },
  read: { type: Boolean }
}, {
  timestamps: true
});

messageSchema.path('createdAt')
  .get(function formatSentTime(createdAt) {
    return moment(createdAt).format('YYYY-MM-DD');
  });

const conversationSchema = new mongoose.Schema({
  from: { type: mongoose.Schema.ObjectId, ref: 'User' },
  to: { type: mongoose.Schema.ObjectId, ref: 'User' },
  messages: [messageSchema]
});


module.exports = mongoose.model('Conversation', conversationSchema);
