/* global api, describe, it,  expect, beforeEach, afterEach */
require('../helper');
const Cat = require('../../../models/cat');
const User = require('../../../models/user');

const userData = [{
  name: 'Hermione',
  age: '1990-04-15',
  email: 'h@h.com',
  password: 'password',
  passwordConfirmation: 'password'
}];

describe('GET /api/cats', () => {

  beforeEach(done => {
    User.create(userData)
      .then(users => {

        const catData = [{
          name: 'Toki',
          age: '2011-12-25T00:00:00.000Z',
          gender: 'male',
          type: 'Persian British short hair',
          gallery: [{
            description: 'Do you have treats!?',
            image: '/images/toki.jpg'
          }],
          owner: users[0]
        }, {
          name: 'Cece',
          age: '2017-02-21T00:00:00.000Z',
          gender: 'female',
          type: 'Persian British short hair',
          gallery: [{
            description: 'Do yu have treats!?',
            image: '/images/cece.jpg'
          }],
          owner: users[1]
        }];
        return Cat.create(catData);
      })
      .then(catsData => console.log(catsData.length, ' cats created.'))
      .then(() => done())
      .catch(done);
  });

  afterEach( done => {
    Cat.collection.remove();
    done();
  });

  it('should return a 200 response', done => {
    api
      .get('/api/cats')
      .set('Accept', 'application/json')
      .expect(200, done);
  });

  it('should return an array', done => {
    api
      .get('/api/cats')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('should return the correct data', done => {
    api
      .get('/api/cats')
      .set('Accept', 'application/json')
      .end((err, res) => {
        const catItem = res.body[0];
        expect(catItem.id).to.be.a('string');
        expect(catItem.name).to.equal(catDatas[0].name);
        expect(catItem.age).to.equal(catDatas[0].age);
        expect(catItem.gender).to.equal(catDatas[0].gender);
        expect(catItem.type).to.equal(catDatas[0].type);
        expect(catItem.gallery.description).to.equal(catDatas[0].gallery.description);
        expect(catItem.gallery.image).to.equal(catDatas[0].gallery.image);
        done();
      });
  });
});
