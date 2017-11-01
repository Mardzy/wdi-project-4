const User = require('../models/user');

function indexRoute(req, res, next) {
  User
    .find()
    // .populate('cats')
    .populate([{ path: 'messages', populate: { path: 'from to user' }}, { path: 'cats' }, { path: 'sentMessages', populate: { path: 'from to user' }}])
    .exec()
    .then((countries) => res.json(countries))
    .catch(next);
}

function createRoute(req, res, next) {
  User
    .create(req.body)
    .then((country) => res.status(201).json(country))
    .catch(next);
}

function showRoute(req, res, next) {
  User
    .findById(req.params.id)
    .populate([{ path: 'messages', populate: { path: 'from to user' }}, { path: 'cats' }, { path: 'sentMessages', populate: { path: 'from to user' }}])
    .exec()
    .then((user) => {
      if(!user) return res.notFound();
      res.json(user);
    })
    .catch(next);
}

function updateRoute(req, res, next) {
  if(req.file) req.body.image = req.file.filename;

  User
    .findById(req.params.id)
    .exec()
    .then((user) => {
      if(!user) return res.notFound();

      for(const field in req.body) {
        user[field] = req.body[field];
      }

      return user.save();
    })
    .then((user) => res.json(user))
    .catch(next);
}

function deleteRoute(req, res, next) {
  User
    .findById(req.params.id)
    .then((user) => {
      if(!user) return res.notFound();
      return user.remove();
    })
    .then(() => res.status(204).end())
    .catch(next);
}

function createComment(req, res, next) {
  req.body.createdBy = req.currentUser;
  User
    .findById(req.params.id)
    .exec()
    .then((user) => {
      user.comments.push(req.body);
      return user.save();
    })
    .then(user => User.populate(user, { path: 'comments.createdBy '}))
    .then(user => res.json(user))
    .catch(next);
}

function deleteComment(req, res, next) {
  req.body.createdBy = req.currentUser;
  User
    .findById(req.params.id)
    .exec()
    .then((user) => {
      if(!user) return res.notFound();

      const comment = user.comments.id(req.params.commentId);
      comment.remove();

      return user.save();
    })
    .then((user) => res.json(user))
    .catch(next);
}

module.exports = {
  index: indexRoute,
  create: createRoute,
  show: showRoute,
  update: updateRoute,
  delete: deleteRoute,
  createComment: createComment,
  deleteComment: deleteComment
};
