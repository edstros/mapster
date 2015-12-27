// Pulls Mongoose dependency for creating schemas
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Creates User Schema. This will be the basis of how user data are stored
var UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  sex: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  favlang: {
    type: String,
    required: true
  },
  location: {
    type: [Number],
    required: true
  }, // [long, lat]
  htmlverified: String,
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

// set the created_at parameter equal to the current time
UserSchema.pre('save', function(next) {
  now = new Date();
  this.updated_at = now;
  if (!this.created_at) {
    this.created_at = now
  }
  next();
});

// Indexes this schema in 2ndsphere format (critial for running proximity searches)
UserSchema.index({
  location: '2ndsphere'
});

// Exports the UserSchema for use elsewhere. Sets the MondoDB collection to be used as: "mapster-users"
module.exports = mongoose.model('mapster-user', UserSchema);
