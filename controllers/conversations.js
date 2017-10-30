const Conversation = require('../models/conversation');

function conversationsIndex(req, res, next) {
  Conversation
    .find({ $or: [{ to: req.currentUser.id }, { from: req.currentUser.id }]})
    .populate('to from')
    .exec()
    .then(conversations => res.json(conversations))
    .catch(next);
}

function conversationsCreate(req, res, next) {
  req.body.from = req.currentUser.id;
  Conversation.findOne({ $or: [
    {to: req.body.to, from: req.body.from },
    {from: req.body.to, to: req.body.from }
  ]})
    .then(conversation => {
      if(!conversation) return Conversation.create(req.body);
      else return conversation;
    })
    // .then(conversation => {
    //   const message = conversation.messages.create(req.body);
    //   conversation.messages.push(message);
    //   return conversation.save();
    // })
    .then(conversation => res.json(conversation))
    .catch(next);
}


function conversationsShow(req, res, next) {
  // console.log(req.params.id);
  Conversation
    .findById(req.params.id)
    .populate('to from')
    .exec()
    .then((conversation) => {
      if(!conversation) return res.notFound();
      res.json(conversation);
    })
    .catch(next);
}

function messagesCreate(req, res, next) {
  req.body.from = req.currentUser.id;
  Conversation.findById(req.params.id)
    .then(conversation => {
      if(!conversation) return res.notFound();
      const message = conversation.messages.create(req.body);
      conversation.messages.push(message);
      return conversation.save();
    })
    .then(message => res.json(message))
    .catch(next);
}

module.exports = {
  index: conversationsIndex,
  create: conversationsCreate,
  show: conversationsShow,
  messagesCreate: messagesCreate
};
