// models/User.js
const mongoose = require('mongoose');

// Define what info each user should have
const userSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ['student', 'specialist', 'employer'], // only these 3 types allowed
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true // no two users can have same email
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create the model and export it
module.exports = mongoose.model('User', userSchema);
