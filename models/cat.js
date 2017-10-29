const mongoose = require('mongoose');
const moment = require('moment');
const s3 = require('../lib/s3');

const imageSchema = new mongoose.Schema({
  src: { type: String, default: 'https://spacelist.ca/assets/ui/placeholder-user.b5ae7217a7.jpg' },
  caption: { type: String }
});

imageSchema
  .path('src')
  .set(function getPreviousSrc(src) {
    this._src = this.src;
    return src;
  });

imageSchema
  .virtual('imageSRC')
  .get(function getImageSRC() {
    if(!this.src) return null;
    return `https://s3-eu-west-1.amazonaws.com/${process.env.AWS_BUCKET_NAME}/${this.src}`;
  });

imageSchema.pre('save', function checkPreviousImage(next) {
  if(this.isModified('src') && this._src) {
    return s3.deleteObject({ Key: this._src }, next);
  }
  next();
});

imageSchema.pre('remove', function removeImage(next) {
  if(this.src) s3.deleteObject({ Key: this.src }, next);
  next();
});

const catSchema = new mongoose.Schema({
  name: { type: String, required: 'Name is required' },
  dob: { type: Date, required: 'Date of birth is required' },
  gender: { type: String, required: 'Gender is required' },
  type: { type: String },
  gallery: [ imageSchema ],
  owner: { type: mongoose.Schema.ObjectId, ref: 'User' }
});

catSchema.virtual('heroImage')
  .get(function getHeroImage() {
    return this.gallery[0];
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


module.exports = mongoose.model('Cat', catSchema);
