var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    userName: {type: String, required: true},
    gender: {type: String, required: true},
    age: {type: Number, required: true},
    favMusic: {type: String, required: true},
    startTime: {type: String, required: true},
    endTime: {type: String, requried: true},
    home: {type: [Number], required: true},
    work: {type: [Number], required: true},
    htmlverified: String,
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

UserSchema.pre('save', function(next) {
  now = new Date();
  this.updated_at = now;
  if(!this.created_at) {
    this.created_at = now;
  }
  next();
});

UserSchema.index({location: '2dsphere'});

module.exports = mongoose.model('carpoolUsers', UserSchema);
