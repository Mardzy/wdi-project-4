const mongoose = require('mongoose');
const moment = require('moment');
const s3 = require('../lib/s3');

// const gallerySchema = new mongoose.Schema({
//   image: { type: String, default: 'https://spacelist.ca/assets/ui/placeholder-user.b5ae7217a7.jpg' },
//   description: { type: String }
// });

const catSchema = new mongoose.Schema({
  name: { type: String, required: 'Name is required' },
  dob: { type: Date, required: 'Date of birth is required' },
  gender: { type: String, required: 'Gender is required' },
  type: { type: String },
  image: {type: String},
  // gallery: [ gallerySchema ],
  owner: { type: mongoose.Schema.ObjectId, ref: 'User' }
});

catSchema.virtual('age')
  .get(function getCurrentAge() {
    const ageInMonths = moment().diff(this.dob, 'months');
    const ageInYears = moment().diff(this.dob, 'years');
    return ( ageInMonths > 12 ) ? ageInYears + ' years' : ageInMonths + ' months';
  });

catSchema.path('dob')
  .get(function formatDob(dob) {
    return moment(dob).format('YYYY-MM-DD');
  });

catSchema
  .path('image')
  .set(function getPreviousImage(image) {
    this._image = this.image;
    return image;
  });

catSchema
  .virtual('imageSRC')
  .get(function getImageSRC() {
    if(!this.image) return null;
    return `https://s3-eu-west-1.amazonaws.com/${process.env.AWS_BUCKET_NAME}/${this.image}`;
  });

catSchema.pre('save', function checkPreviousImage(next) {
  if(this.isModified('image') && this._image) {
    return s3.deleteObject({ Key: this._image }, next);
  }
  next();
});

catSchema.pre('remove', function removeImage(next) {
  if(this.image) s3.deleteObject({ Key: this.image }, next);
  next();
});

module.exports = mongoose.model('Cat', catSchema);
