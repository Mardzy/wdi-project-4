const mongoose   = require('mongoose');
const Promise = require('bluebird');
mongoose.Promise = Promise;

const { dbURI } = require('../config/environment');

const User = require('../models/user');
const Cat = require('../models/cat');
const Message = require('../models/message');

mongoose.connect(dbURI, { useMongoClient: true })
  .then(db => {
    db.dropDatabase();

    return User
      .create([{
        name: 'Paul',
        dob: '1983-12-19',
        email: 'mardlingp@gmail.com',
        password: 'password',
        passwordConfirmation: 'password',
        image: '/assets/images/mardzy.png'
      }, {
        name: 'Juls',
        dob: '1988-02-03',
        email: 'j@j.com',
        password: 'password',
        passwordConfirmation: 'password',
        image: '/assets/images/juls.png'
      }, {
        name: 'Hermione',
        dob: '1990-04-15',
        email: 'h@h.com',
        password: 'password',
        passwordConfirmation: 'password',
        image: '/assets/images/hermione.png'
      }])
      .then(users => {
        console.log(`${users.length} users created`);
        users[0].comments.push({
          createdBy: users[1],
          text: 'nice cat'
        });
        users[1].comments.push({
          createdBy: users[2],
          text: 'what beautiful furr you have'
        });
        users[2].comments.push({
          createdBy: users[0],
          text: 'such a squishy face'
        });

        const promises = [
          users[0].save(),
          users[1].save(),
          users[2].save()
        ];

        return Promise.all(promises);
      })
      .then((users) => {
        return Message
          .create([{
            text: 'Hello',
            from: users[0],
            to: users[1]
          }, {
            text: 'Hi, how are you',
            from: users[1],
            to: users[0]
          } , {
            text: 'Hiya',
            from: users[1],
            to: users[2]
          }, {
            text: 'Hello, I am well, and you?',
            from: users[2],
            to: users[1]
          }])
          .then(messages => {
            console.log(`${messages.length} messages created.`);
            return Cat
              .create([{
                name: 'Cece',
                dob: '2017-02-21',
                gender: 'female',
                type: 'Persian British short hair',
                gallery: [{
                  description: 'Do you have treats!?',
                  image: '/assets/images/cece.jpg'
                }],
                owner: users[0]
              }, {
                name: 'Toki',
                dob: '2011-12-25',
                gender: 'male',
                type: 'Persian British short hair',
                gallery: [{
                  description: 'Sitting pretty.',
                  image: '/assets/images/toki.jpg'
                }],
                owner: users[1]
              }, {
                name: 'Crookshanks',
                dob: '1998-04-15',
                gender: 'male',
                type: 'Persian',
                gallery: [{
                  description: 'Look at me',
                  image: '/assets/images/crookshanks.jpg'
                }],
                owner: users[2]
              }])
              .then(cats => console.log(`${cats.length} cats created.`));
          });
      });
  })
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());
