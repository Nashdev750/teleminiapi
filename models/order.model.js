// models/Product.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userid: {
    type: String,
    default: undefined
  },
   shippingdetails: {
    type: Object,
    required: true
  },
  items: {
    type: Array,
    required: true
  },
  status: {
      type: Number,
      default: 0
    },

}, {
  timestamps: true 
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
