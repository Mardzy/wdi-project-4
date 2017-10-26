const Message = require('../models/message');

function messagesIndex(req, res, next) {
  Message
    .find()
    .populate('to from')
    .exec()
    .then(messages => res.json(messages))
    .catch(next);
}

function messagesCreate(req, res, next) {

  if(req.file) req.body.image = req.file.filename;

  Message
    .create(req.body)
    .then(message => res.status(201).json(message))
    .catch(next);
}


function messagesShow(req, res, next) {
  // console.log(req.params.id);
  Message
    .findById(req.params.id)
    .populate('to from')
    .exec()
    .then((message) => {
      if(!message) return res.notFound();
      res.json(message);
    })
    .catch(next);
}

module.exports = {
  index: messagesIndex,
  create: messagesCreate,
  show: messagesShow
};
