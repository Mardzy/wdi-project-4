const mongoose = require('mongoose');
// const s3 = require('../lib/s3');

const gallerySchema = new mongoose.Schema({
  description: { type: String },
  image: {type: String, required: true },
  owner: { type: mongoose.Schema.ObjectId, ref: 'User' }
});

const catSchema = new mongoose.Schema({
  name: { type: String, required: 'Name is required' },
  age: { type: Date, required: 'Age is required' },
  gender: { type: String, required: 'Gender is required' },
  type: { type: String },
  gallery: [ gallerySchema ],
  owner: { type: mongoose.Schema.ObjectId, ref: 'User' }
});

// catSchema
//   .path('image')
//   .set(function getPreviousImage(image) {
//     this._image = this.image;
//     return image;
//   });
//
// catSchema
//   .virtual('imageSRC')
//   .get(function getImageSRC() {
//     if(!this.image) return null;
//     return `https://s3-eu-west-1.amazonaws.com/${process.env.AWS_BUCKET_NAME}/${this.image}`;
//   });
//
// catSchema.pre('save', function checkPreviousImage(next) {
//   if(this.isModified('image') && this._image) {
//     return s3.deleteObject({ Key: this._image }, next);
//   }
//   next();
// });
//
// catSchema.pre('remove', function removeImage(next) {
//   if(this.image) s3.deleteObject({ Key: this.image }, next);
//   next();
// });

module.exports = mongoose.model('Cat', catSchema);
