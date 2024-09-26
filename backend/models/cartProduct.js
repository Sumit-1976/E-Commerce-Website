const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addToCartSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,  
    ref: 'product',  
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    default: 1  
  },
  userId: {
    type: Schema.Types.ObjectId, 
    ref: 'user',  
    required: true
  }
}, {
  timestamps: true
});

const addToCartModel = mongoose.model('CartProduct', addToCartSchema);

module.exports = addToCartModel;
