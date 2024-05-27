const mongoose = require('mongoose');

const produitSchema = mongoose.Schema({
  title: { 
    type: String,
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  imageUrl: { 
    type: String, 
    required: true 
  },
  price: { 
    type: Number, 
    required: true 
  },
  quantite:{
    type: Number,
    required: true
  },
  active:{
    type: Boolean,
    default: false
  },
  created_at: {
    type: Date
  },
  update_on: {
    type: Date,
    default: Date.now
  },
});

const produit = mongoose.model('produit', produitSchema);
module.exports = produit;