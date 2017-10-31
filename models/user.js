const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const s3 = require('../lib/s3');
const moment = require('moment');

const coordinateSchema = new mongoose.Schema({
  lat: Number,
  lng: Number
});

const commentSchema = new mongoose.Schema({
  text: {type: String, required: true },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: 'Name is required' },
  location: coordinateSchema,
  dob: {type: Date},
  email: { type: String, required: 'Email is required', unique: 'Email address already taken' },
  password: { type: String, required: 'Invalid credentials' },
  // facebookId: { type: String, unique: true, required: false }, // for facebook login
  image: { type: String, default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWstsZn-GdjM44v3LixeexalwxI1nxFQ3Bs8cIkVU5KPE-6zFVfg' },
  bio: { type: String },
  catOwner: { type: Boolean },
  comments: [commentSchema]
});

userSchema.virtual('age')
  .get(function getCurrentAge() {
    const ageInMonths = moment().diff(this.dob, 'months');
    const ageInYears = moment().diff(this.dob, 'years');
    return ( ageInMonths > 12 ) ? ageInYears + ' years' : ageInMonths + ' months';
  });

userSchema.path('dob')
  .get(function formatDob(dob) {
    return moment(dob).format('YYYY-MM-DD');
  });

userSchema
  .virtual('cats', { // 'cats' is the name of the virtual
    ref: 'Cat', // 'Cat' is the name of the model
    localField: '_id', // use the local _id field from this schema
    foreignField: 'owner' // to match up with the owner field from the Cat schema
  });

userSchema
  .virtual('messages', {
    ref: 'Conversation',
    localField: '_id',
    foreignField: 'to'
  });

userSchema
  .virtual('sentMessages', {
    ref: 'Conversation',
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
  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }
  if (this.isModified('image') && this._image) {
    return s3.deleteObject({ Key: this._image }, next);
  }
  next();
});

userSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema
  .path('image')
  .set(function getPreviousImage(image) {
    this._image = this.image;
    return image;
  });

userSchema
  .virtual('imageSRC')
  .get(function getImageSRC() {
    if(!this.image) return null;
    return `https://s3-eu-west-1.amazonaws.com/${process.env.AWS_BUCKET_NAME}/${this.image}`;
  });


userSchema.pre('remove', function removeImage(next) {
  if(this.image) s3.deleteObject({ Key: this.image }, next);
  next();
});

module.exports = mongoose.model('User', userSchema);
