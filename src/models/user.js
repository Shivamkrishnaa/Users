const mongoose = require('mongoose');
export const User =   mongoose.model('User', mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  firstName:{
    type: String,
    required: true
  },
  lastName:{
    type: String,
  },
  phone:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  createdAt:{
    type: Date,
    default: Date.now
  },
  updatedAt:{
    type: Date,
    default: Date.now
  },
  loggedOutAt:{
    type: Date
  }
})) 