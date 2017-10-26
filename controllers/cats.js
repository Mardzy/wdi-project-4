const Cat = require('../models/cat');

function catsIndex(req, res, next) {
  Cat
    .find()
    .populate('owner')
    .exec()
    .then(cats => res.json(cats))
    .catch(next);
}

function catsCreate(req, res, next) {

  if(req.file) req.body.image = req.file.filename;

  Cat
    .create(req.body)
    .then(cat => res.status(201).json(cat))
    .catch(next);
}

function catsShow(req, res, next) {
  // console.log(req.params.id);
  Cat
    .findById(req.params.id)
    .populate('owner')
    .exec()
    .then((cat) => {
      if(!cat) return res.notFound();
      res.json(cat);
    })
    .catch(next);
}
//
// function catsUpdate(req, res, next) {
//
//   if(req.file) req.body.image = req.file.filename;
//
//   Cat
//     .findById(req.params.id)
//     .populate('owner')
//     .exec()
//     .then((cat) => {
//       if(!cat) return res.notFound();
//       cat = Object.assign(cat, req.body);
//       return cat.save();
//     })
//     .then(cat => res.json(cat))
//     .catch(next);
// }
//
// function catsDelete(req, res, next) {
//   Cat
//     .findById(req.params.id)
//     .populate('owner')
//     .exec()
//     .then((cat) => {
//       if(!cat) return res.notFound();
//       return cat.remove();
//     })
//     .then(() => res.status(204).end())
//     .catch(next);
// }

module.exports = {
  index: catsIndex,
  create: catsCreate,
  show: catsShow
  // update: catsUpdate,
  // delete: catsDelete
};
