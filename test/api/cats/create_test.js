// /* global api, describe, it, expect, before, after, afterEach */
//
// const Cat = require('../../../models/cat');
// const User = require('../../../models/user');
// const jwt = require('jsonwebtoken');
// const { secret } = require('../../../config/environment');
//
// describe('POST /api/cats/:id', () => {
//   let cat = null;
//   let catData = null;
//   let token = null;
//
//   catData = [{
//     name: 'Toki',
//     dob: '2011-12-25',
//     gender: 'male',
//     type: 'Persian British short hair',
//     gallery: [{
//       description: 'Do you have treats!?',
//       image: '/images/toki.jpg'
//     }],
//     comments: [],
//     id: '59fa4677e30329760f2a26f1'
//   }, {
//     name: 'Cece',
//     dob: '2017-02-21',
//     gender: 'female',
//     type: 'Persian British short hair',
//     gallery: [{
//       description: 'Do yu have treats!?',
//       image: '/images/cece.jpg'
//     }],
//     comments: [],
//     id: '59fa4677e30329760f2a26f3'
//   }];
//
//   before(done => {
//     User.create({
//       name: 'Hermione',
//       dob: '1990-04-15',
//       email: 'h@h.com',
//       password: 'password',
//       passwordConfirmation: 'password',
//       conversations: { message: 'hi'}
//     }, (err, user) => {
//       token = jwt.sign({ userId: user.id }, secret, { expiresIn: '1hr' });
//     })
//       .then(() => done())
//       .catch(done);
//   });
//
//   after(done=> {
//     User.collection.remove(done);
//   });
//   afterEach(done=> {
//     Cat.collection.remove(done);
//   });
//
//   it('should return a 200 response', done => {
//     api
//       .post(`/api/cats/${cat.id}`)
//       .set('Accept', 'application/json')
//       .send(catData[1])
//       .expect(200, done);
//   });
//
//   it('should return a 200 response', done => {
//     api
//       .post(`/api/cats/${cat.id}`)
//       .set('Accept', 'application/json')
//       .set('Authorization', `Bearer ${token}`)
//       .send(catData[1])
//       .expect(200, done);
//   });
//
//   it('should return an object', done => {
//     api
//       .post(`/api/cats/${cat.id}`)
//       .set('Accept', 'application/json')
//       .end((err, res) => {
//         expect(res.body).to.be.an('object');
//         done();
//       });
//   });
//
//   it('should return the correct data', done => {
//     api
//       .post(`/api/cats/${cat.id}`)
//       .set('Accept', 'application/json')
//       .set('Authorization', `Bearer ${token}`)
//       .send(catData[0])
//       .end((err, res) => {
//         // console.log(res.body);
//         const catItem = res.body;
//         expect(catItem.id).to.be.a('string');
//         expect(catItem.name).to.equal(catData[0].name);
//         expect(catItem.dob).to.equal(catData[0].dob);
//         expect(catItem.gender).to.equal(catData[0].gender);
//         expect(catItem.type).to.equal(catData[0].type);
//         expect(catItem.gallery.description).to.equal(catData[0].gallery.description);
//         expect(catItem.gallery.image).to.equal(catData[0].gallery.image);
//         done();
//       });
//   });
// });
