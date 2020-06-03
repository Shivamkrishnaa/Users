const mongoose = require('mongoose');
export const Item =   mongoose.model('Item', mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  merchant_id:{
    type: Number,
    required: true
  },
  name:{
    type: String,
    required: true
  },
  price:{
    type: Number,
    required: true
  },
  description:{
    type: String
  },
  createdAt:{
    type: Date,
    default: Date.now
  },
  updatedAt:{
    type: Date,
    default: Date.now
  }
})) 