/* global api, describe, it, expect, before, after, afterEach */
const jwt = require('jsonwebtoken');
const { secret } = require('../../../config/environment');

const Cat = require('../../../models/cat');
const User = require('../../../models/user');

describe('DELETE /api/cats/:id', () => {
  let cat = null;
  let token = null;

  before(done => {
    User.create({
      name: 'Hermione',
      dob: '1990-04-15',
      email: 'h@h.com',
      password: 'password',
      passwordConfirmation: 'password',
      conversations: { message: 'hi'}
    }, (err, user) => {
      token = jwt.sign({ userId: user.id }, secret, { expiresIn: '1hr' });
    })
      .then(users => {

        return Cat.create({
          name: 'Toki',
          dob: '2011-12-25',
          gender: 'male',
          type: 'Persian British short hair',
          gallery: [{
            description: 'Do you have treats!?',
            image: '/images/toki.jpg'
          }],
          owner: users[1],
          comments: [],
          id: '59fa4677e30329760f2a26f1'
        }, {
          name: 'Cece',
          dob: '2017-02-21',
          gender: 'female',
          type: 'Persian British short hair',
          gallery: [{
            description: 'Do yu have treats!?',
            image: '/images/cece.jpg'
          }],
          owner: users[1],
          comments: [],
          id: '59fa4677e30329760f2a26f3'

        }, (err, cats)=> cat = cats[0]);
      })
      .then(() => done())
      .catch(done);
  });

  after(done=> {
    User.collection.remove();
    done();
  });

  afterEach(done=> {
    Cat.collection.remove();
    done();
  });


  it('should return a 401 response without a token', done => {
    api
      .delete(`/api/cats/${cat.id}`)
      .set('Accept', 'application/json')
      .expect(401, done);
  });

  it('should return a 204 response', done => {
    api
      .delete(`/api/cats/${cat.id}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect(204, done);
  });

  it('should actually delete the record', done => {
    api
      .delete(`/api/cats/${cat.id}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .end(() => {
        Cat.findById(cat.id, (err, cat) => {
          expect(cat).to.be.null;
          done();
        });
      });
  });


});
