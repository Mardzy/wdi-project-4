/* global api, describe, it, expect, beforeEach, afterEach */
require('../helper');
const jwt = require('jsonwebtoken');
const { secret } = require('../../../config/environment');

const Cat = require('../../../models/cat');
const User = require('../../../models/user');

describe('POST /api/cats/:id', () => {
  let catData = null;
  let token = null;

  beforeEach(done => {
    User.create([{
      name: 'Hermione',
      dob: '1990-04-15',
      email: 'h@h.com',
      password: 'password',
      passwordConfirmation: 'password'
    },{
      name: 'test',
      dob: '1990-04-15',
      email: 't@t.com',
      password: 'test',
      passwordConfirmation: 'test'
    }])
      .then(users=>{
        token = jwt.sign({ userId: users[0].id }, secret, { expiresIn: '1hr' });
        catData = [{
          name: 'Cece',
          dob: '2017-02-21',
          gender: 'female',
          type: 'Persian British short hair',
          gallery: [{
            description: 'Do you have treats!?',
            image: '/images/cece.jpg'
          }],
          owner: users[0],
          comments: []
        }, {
          name: 'Toki',
          dob: '2011-12-25',
          gender: 'male',
          type: 'Persian British short hair',
          gallery: [{
            description: 'Do you have treats!?',
            image: '/images/toki.jpg'
          }],
          owner: users[0],
          comments: []
        }];
        done();
      })
      .catch(done);
  });

  afterEach(done => {
    Cat.remove()
      .then(() => User.remove())
      .then(() => done())
      .catch(done);
  });

  it('should return a 401 response', done => {
    api
      .post('/api/cats/')
      .set('Accept', 'application/json')
      .send(catData[0])
      .expect(401, done);
  });

  it('should return a 201 response', done => {
    api
      .post('/api/cats/')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(catData[0])
      .expect(201, done);
  });

  it('should return an object', done => {
    api
      .post('/api/cats/')
      .set('Accept', 'application/json')
      .send(catData[0])
      .end((err, res) => {
        console.log(err);
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should return the correct data', done => {
    api
      .post('/api/cats/')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(catData[0])
      .end((err, res) => {
        // console.log(res.body);
        const catItem = res.body;
        expect(catItem._id).to.be.a('string');
        expect(catItem.name).to.equal(catData[0].name);
        expect(catItem.dob).to.equal(catData[0].dob);
        expect(catItem.gender).to.equal(catData[0].gender);
        expect(catItem.type).to.equal(catData[0].type);
        expect(catItem.gallery.description).to.equal(catData[0].gallery.description);
        expect(catItem.gallery.image).to.equal(catData[0].gallery.image);
        done();
      });
  });
});
