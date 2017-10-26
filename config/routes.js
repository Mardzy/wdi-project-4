const router = require('express').Router();
const cats = require('../controllers/cats');
const users = require('../controllers/users');
const messages = require('../controllers/messages');
// const auth = require('../controllers/auth');
// const secureRoute = require('../lib/secureRoute');

router.route('/cats')
  .get(cats.index)
  .post(cats.create);
//
router.route('/cats/:id')
  .get(cats.show);
//   .put(cats.update)
//   .delete(cats.delete);

router.route('/users')
  .get(users.index)
  .post(users.create);
//
router.route('/users/:id')
  .get(users.show);
//   .put(users.update)
//   .delete(users.delete);

router.route('/messages')
  .get(messages.index)
  .post(messages.create);


router.route('/messages/:id')
  .get(messages.show);

// router.route('/register')
//   .post(auth.register);
//
// router.route('/login')
//   .post(auth.login);

// router.all('/*', (req, res) => res.status(400).send('NOT FOUND'));

module.exports = router;
