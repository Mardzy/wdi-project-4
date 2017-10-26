/* global api, describe, it, expect, before, after, afterEach */
require('../helper');

const jwt = require('jsonwebtoken');
const { secret } = require('../../../config/environment');
const userData = require('../../../models/cat');
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

describe('POST /api/cats', () => {
  let token = null;

  before(done => {
    User.create({
      name: 'test',
      age: '2017-02-21',
      email: 'test@test.com',
      password: 'test',
      passwordConfirmation: 'test'
    }, (err, user) => {
      token = jwt.sign({ userId: user.id }, secret, { expiresIn: '1hr' });
      done(err);
    });
  });

  after(done => {
    User.remove(done);
  });

  afterEach(done => {
    userData.remove(done);
  });

  it('should return a 401 response', done => {
    api
      .post('/api/cats')
      .set('Accept', 'appliuserDataion/json')
      .send(catData[0])
      .expect(401, done);
  });

  it('should return a 201 response with a token', done => {
    api
      .post('/api/cats')
      .set('Accept', 'appliuserDataion/json')
      .set('Authorization', `Bearer ${token}`)
      .send(catData[0])
      .expect(201, done);
  });

  it('should return an object', done => {
    api
      .post('/api/cats')
      .set('Accept', 'appliuserDataion/json')
      .set('Authorization', `Bearer ${token}`)
      .send(catData[0])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should return the correct data', done => {
    api
      .post('/api/cats')
      .set('Accept', 'appliuserDataion/json')
      .set('Authorization', `Bearer ${token}`)
      .send(catData[0])
      .end((err, res) => {
        const catItem = res.body;
        expect(catItem.id).to.be.a('string');
        expect(catItem.name).to.equal(catData[0].name);
        expect(catItem.age).to.equal(catData[0].age);
        expect(catItem.gender).to.equal(catData[0].gender);
        expect(catItem.type).to.equal(catData[0].type);
        expect(catItem.gallery.description).to.equal(catData[0].gallery.description);
        expect(catItem.gallery.image).to.equal(catData[0].gallery.image);
        done();
      });
  });
});
