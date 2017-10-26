/* global api, describe, it, expect, beforeEach, afterEach */
const helper = require('../helper');

const Cat = require('../../../models/cat');

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
describe('GET /api/cats/:id', () => {
  let cat = null;

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

  it('should return a 200 response', done => {
    api
      .get(`/api/cats/${cat.id}`)
      .set('Accept', 'application/json')
      .expect(200, done);
  });

  it('should return an object', done => {
    api
      .get(`/api/cats/${cat.id}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should return an array', done => {
    api
      .get(`/api/cats/${cat.id}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        const catItem = res.body;
        expect(catItem.id).to.be.a('string');
        expect(catItem.title).to.equal(catData[0].title);
        expect(catItem.image).to.equal(catData[0].image);
        expect(catItem.category).to.equal(catData[0].category);
        done();
      });
  });
});
