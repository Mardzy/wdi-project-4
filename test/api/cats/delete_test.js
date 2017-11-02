/* global api, describe, it, expect, beforeEach, afterEach */
require('../helper');
const jwt = require('jsonwebtoken');
const { secret } = require('../../../config/environment');

const Cat = require('../../../models/cat');
const User = require('../../../models/user');

describe('DELETE /api/cats/:id', () => {
  let cat = null;
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
            description: 'Do yu have treats!?',
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
        return Cat.create(catData);
      })
      .then(cats => cat = cats[0])
      .then(()=>done())
      .catch(done);
  });

  afterEach(done => {
    Cat.remove()
      .then(() => User.remove())
      .then(() => done())
      .catch(done);
  });



  it('should return a 401 response without a token', done => {
    api
      .delete(`/api/cats/${cat._id}`)
      .set('Accept', 'application/json')
      .expect(401, done);
  });

  it('should return a 204 response', done => {
    api
      .delete(`/api/cats/${cat._id}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect(204, done);
  });

  it('should actually delete the record', done => {
    api
      .delete(`/api/cats/${cat._id}`)
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
