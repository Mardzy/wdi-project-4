const router = require('express').Router();
const cats = require('../controllers/cats');
const users = require('../controllers/users');
const conversations = require('../controllers/conversations');
const auth = require('../controllers/auth');
const secureRoute = require('../lib/secureRoute');
const imageUpload = require('../lib/imageUpload');

router.route('/cats')
  .get(cats.index)
  .post(secureRoute, imageUpload, cats.create);

router.route('/cats/:id')
  .get(cats.show)
  .put(secureRoute, cats.update)
  .delete(secureRoute, cats.delete);

router.route('/cats/:id/images')
  .post(secureRoute, imageUpload, cats.imagesCreate)
  .delete(secureRoute, cats.imagesDelete);

router.route('/cats/:id/images/:srcId')
  .get(secureRoute, cats.imagesShow)
  .put(secureRoute, imageUpload, cats.imagesDelete);

router.route('/users')
  .get(users.index)
  .post(users.create);

router.route('/users/:id')
  .get(users.show)
  .put(imageUpload, users.update)
  .delete(secureRoute, users.delete);

router.route('/conversations')
  .get(secureRoute, conversations.index)
  .post(secureRoute, conversations.create);

router.route('/conversations/:id')
  .get(conversations.show);

router.route('/conversations/:id/messages')
  .post(secureRoute, conversations.messagesCreate);


router.route('/register')
  .post(auth.register);

router.route('/login')
  .post(auth.login);

router.all('/*', (req, res) => res.status(400).send('NOT FOUND'));

module.exports = router;
