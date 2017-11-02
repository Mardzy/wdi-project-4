/* global api, describe, it, expect, before, after */

const Cat = require('../../../models/cat');
const User = require('../../../models/user');

const userData = [{
  name: 'Hermione',
  dob: '1990-04-15',
  email: 'h@h.com',
  password: 'password',
  passwordConfirmation: 'password',
  conversations: { message: 'hi'}
}];
describe('GET /api/cats/:id', () => {
  let cat = null;
  let catData = null;

  before(done => {
    User.create(userData)
      .then(users => {
        catData = [{
          name: 'Toki',
          dob: '2011-12-25',
          gender: 'male',
          type: 'Persian British short hair',
          gallery: [{
            description: 'Do you have treats!?',
            image: '/images/toki.jpg'
          }],
          owner: users[1],
          comments: []
        }, {
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
        }];
        return Cat.create(catData);
      })
      .then(cats => cat = cats[0])
      .then(() => done())
      .catch(done);
  });

  after(done=> {
    Cat.collection.remove();
    User.collection.remove();
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

  it('should return the correct data', done => {
    api
      .get(`/api/cats/${cat.id}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        // console.log(res.body);
        const catItem = res.body;
        expect(catItem.id).to.be.a('string');
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
