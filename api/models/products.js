const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name         : { type: String, required: [ true, 'Please add a product name' ] },
  price        : { type: Number, required: [ true, 'Please add a product price' ] },
  productImage : { type: String, required: [ true, 'Please add an image' ] }
});

module.exports = mongoose.model('Product', productSchema);
