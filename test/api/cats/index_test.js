/* global api, describe, it,  expect, beforeEach, helper, afterEach */
const helper = require('../helper');
const Food = require('../../../models/cat');

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

describe('GET /api/cats', () => {

  beforeEach(done => {
    Food.create(catData, done);
  });

  afterEach( done => {
    Food.collection.remove();
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
