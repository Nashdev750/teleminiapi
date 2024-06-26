// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
      type: String,
      default: ""
    },
  description: {
      type: String,
      default: ""
    },
  stock: {
      type: Number,
      default:0
    },
  status: {
      type: Number,
      default: 0
    },

}, {
  timestamps: true 
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
