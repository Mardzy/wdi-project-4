const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// const s3 = require('../lib/s3');

const commentSchema = new mongoose.Schema({
  text: {type: String, required: true },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: 'Name is required' },
  age: { type: Date, required: 'Age is required' },
  email: { type: String, required: 'Email is required', unique: 'Email address already taken' },
  password: { type: String },
  // facebookId: { type: String, unique: true, required: false }, // for facebook login
  image: { type: String },
  comments: [commentSchema]
});

userSchema
  .virtual('cats', { // 'cats' is the name of the virtual
    ref: 'Cat', // 'Cat' is the name of the model
    localField: '_id', // use the local _id field from this schema
    foreignField: 'owner' // to match up with the createdBy field from the Post schema
  });

userSchema
  .virtual('messages', {
    ref: 'Message',
    localField: '_id',
    foreignField: 'to'
  });

userSchema
  .virtual('sentMessages', {
    ref: 'Message',
    localField: '_id',
    foreignField: 'from'
  });

userSchema
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation;
  });

userSchema.pre('validate', function checkPasswordConfirmation(next) {
  if(!this.password && !this.facebookId) this.invalidate('password', 'Password is required');
  if(this.isModified('password') && this._passwordConfirmation !== this.password) {
    this.invalidate('passwordConfirmation', 'Passwords do not match');
  }
  next();
});

userSchema.pre('save', function hashPassword(next) {
  if(this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }
  next();
});

userSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password);
};

// userSchema
//   .path('image')
//   .set(function getPreviousImage(image) {
//     this._image = this.image;
//     return image;
//   });
//
// userSchema
//   .virtual('imageSRC')
//   .get(function getImageSRC() {
//     if(!this.image) return null;
//     return `https://s3-eu-west-1.amazonaws.com/${process.env.AWS_BUCKET_NAME}/${this.image}`;
//   });
//
// userSchema.pre('save', function checkPreviousImage(next) {
//   if(this.isModified('image') && this._image) {
//     return s3.deleteObject({ Key: this._image }, next);
//   }
//   next();
// });
//
// userSchema.pre('remove', function removeImage(next) {
//   if(this.image) s3.deleteObject({ Key: this.image }, next);
//   next();
// });

module.exports = mongoose.model('User', userSchema);
