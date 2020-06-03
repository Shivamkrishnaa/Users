const mongoose = require('mongoose');
export const Order =   mongoose.model('Order', mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  items: {
    type: [Number],
    required: true
  },
  total_price:{
    type: Number,
    required: true
  },
  user_id:{
    type: Number,
    required: true
  },
  merchant_id:{
    type: [Number],
    required: true
  },
  placed_at:{
    type: Date,
    default: Date.now
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