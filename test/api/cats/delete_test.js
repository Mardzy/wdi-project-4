/* global api, describe, it, expect,before, beforeEach,after, afterEach */
const helper = require('../helper');
const jwt = require('jsonwebtoken');
const {secret} = require('../../../config/environment');
const Cat = require('../../../models/cat');
const User = require('../../../models/user');

const catData = [{
  name: 'Toki',
  age: '2011-12-25T00:00:00.000Z',
  gender: 'male',
  type: 'Persian British short hair',
  gallery: [{
    description: 'Do you have treats!?',
    image: '/images/toki.jpg'
  }]
}, {
  name: 'Cece',
  age: '2017-02-21T00:00:00.000Z',
  gender: 'female',
  type: 'Persian British short hair',
  gallery: [{
    description: 'Do yu have treats!?',
    image: '/images/cece.jpg'
  }]
}];

describe('DELETE /api/cats/:id', () => {
  let token = null;
  let cat = null;

  before(done => {
    User.create({
      name: 'test',
      age: '2017-02-21',
      email: 'test@test.com',
      password: 'test',
      passwordConfirmation: 'test'
    }, (err, user) => {
      token = jwt.sign({userId: user.id}, secret, {expiresIn: '1hr'});
      done(err);
    });
  });

  beforeEach(done => {
    Cat.create(catData, (err, cats) => {
      cat = cats[0];
      done();
    });
  });

  afterEach(done=> {
    Cat.collection.remove();
    done();
  });

  after(done => {
    User.collection.remove();
    done();
  });

  it('should return a 401 response', done => {
    api
      .delete(`/api/cats/${cat.id}`)
      .set('Accept', 'application/json')
      .send(catData[0])
      .expect(401, done);
  });

  it('should return a 204 response', done => {
    api
      .delete(`/api/cats/${cat.id}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(catData[0])
      .expect(204, done);
  });

  it('should return an empty response', done => {
    api
      .delete(`/api/cats/${cat.id}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.body).to.deep.eq({});
        done();
      });

  });

  it('should have deleted the record', done => {
    api
      .delete(`/api/cats/${cat.id}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .end(() => {
        Cat
          .findById(cat.id)
          .exec()
          .then(cat => {
            expect(cat).to.eq(null);
            done();
          });
      });
  });
});
