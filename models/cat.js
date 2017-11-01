const mongoose = require('mongoose');
const moment = require('moment');
const s3 = require('../lib/s3');

const imageSchema = new mongoose.Schema({
  image: { type: String },
  caption: { type: String }
});

const commentSchema = new mongoose.Schema({
  text: {type: String, required: true },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User' }
});

imageSchema
  .path('image')
  .set(function getPreviousSrc(image) {
    this._image = this.image;
    return image;
  });

imageSchema
  .virtual('imageSRC')
  .get(function getImageSRC() {
    if(!this.image) return null;
    return `https://s3-eu-west-1.amazonaws.com/${process.env.AWS_BUCKET_NAME}/${this.image}`;
  });

imageSchema.pre('save', function checkPreviousImage(next) {
  if(this.isModified('image') && this._image) {
    return s3.deleteObject({ Key: this._image }, next);
  }
  next();
});

imageSchema.pre('remove', function removeImage(next) {
  if(this.image) s3.deleteObject({ Key: this.image }, next);
  next();
});

const catSchema = new mongoose.Schema({
  name: { type: String, required: 'Name is required' },
  dob: { type: Date, required: 'Date of birth is required' },
  gender: { type: String, required: 'Gender is required' },
  type: { type: String },
  gallery: [ imageSchema ],
  owner: { type: mongoose.Schema.ObjectId, ref: 'User' },
  comments: [commentSchema]
});

catSchema.virtual('heroImage')
  .get(function getHeroImage() {
    return this.gallery[0];
  });

catSchema.virtual('age')
  .get(function getCurrentAge() {
    const ageInMonths = moment().diff(this.dob, 'months');
    const ageInYears = moment().diff(this.dob, 'years');
    return ( ageInMonths > 12 ) ? ageInYears + ' year' : ageInMonths + ' month';
  });


catSchema.path('dob')
  .get(function formatDob(dob) {
    return moment(dob).format('YYYY-MM-DD');
  });


module.exports = mongoose.model('Cat', catSchema);
