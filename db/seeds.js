const mongoose   = require('mongoose');
const Promise = require('bluebird');
mongoose.Promise = Promise;

const { dbURI } = require('../config/environment');

const User = require('../models/user');
const Cat = require('../models/cat');
const Conversation = require('../models/conversation');

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
        image: '',
        bio: 'Hi I\'m Paul!'
      }, {
        name: 'Juls',
        dob: '1988-02-03',
        email: 'j@j.com',
        password: 'password',
        passwordConfirmation: 'password',
        image: '',
        bio: 'Hi I\'m Juls!'
      }, {
        name: 'Hermione',
        dob: '1990-04-15',
        email: 'h@h.com',
        password: 'password',
        passwordConfirmation: 'password',
        image: '',
        bio: 'Hi I\'m Hermione!'
      }])
      .then(users => {
        console.log(`${users.length} users created`);
        users[0].comments.push({
          createdBy: users[1],
          text: 'Yo have a nice cat'
        });
        users[1].comments.push({
          createdBy: users[2],
          text: 'What beautiful cat you have'
        });
        users[2].comments.push({
          createdBy: users[0],
          text: 'He has such a squishy face'
        });

        const promises = [
          users[0].save(),
          users[1].save(),
          users[2].save()
        ];

        return Promise.all(promises);
      })
      .then((users) => {
        return Conversation
          .create([{
            from: users[0],
            to: users[1],
            messages: [{
              text: 'Hello there Juls',
              from: users[0]
            }]
          }, {
            from: users[1],
            to: users[0],
            messages: [{
              text: 'Well Hello there Paul, how are you?',
              from: users[1]
            }]
          }, {
            from: users[2],
            to: users[0],
            messages: [{
              text: 'Hello there Paul',
              from: users[2]
            }]
          }, {
            from: users[0],
            to: users[2],
            messages: [{
              text: 'Hi Hermione',
              from: users[0]
            }]
          }])
          .then(messages => {
            console.log(`${messages.length} messages created.`);
            return Cat
              .create([{
                name: 'Cece',
                dob: '2017-02-21',
                gender: 'female',
                type: 'Persian British short hair',
                gallery: [],
                owner: users[0]
              }, {
                name: 'Toki',
                dob: '2011-12-25',
                gender: 'male',
                type: 'Persian British short hair',
                gallery: [],
                owner: users[1]
              }, {
                name: 'Crookshanks',
                dob: '1998-04-15',
                gender: 'male',
                type: 'Persian',
                gallery: [],
                owner: users[2]
              }])
              .then(cats => console.log(`${cats.length} cats created.`));
          });
      });
  })
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());
