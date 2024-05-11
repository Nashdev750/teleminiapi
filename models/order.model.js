// models/Product.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderid: {
    type: Number,
    default: 0
  },
  userid: {
    type: String,
    default: undefined
  },
  chatid: {
    type: Number,
    require: true
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
