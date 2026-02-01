const mongoose = require('mongoose');

const Product = mongoose.Schema(
  {
    id_marque:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Marque',
      required: true
    },
    nom: { 
      type: String, 
      required: true, 
    },
    modele:{
      type: String, 
      required: true, 
    },
    category: {
      type: String,
      required: true,
      enum: ['shoes', 'backpack', 'ballon']
    },
    attributes: {
      color: { type: String},
      size: { type: [Number] },
      weight: { type: Number },
      pied:{ type:[String], enum:['plat', 'creux', 'neutre']}
    },
    photo:{
      type: String, 
      required: true, 
    },
    description:{
      type: String, 
      required: true, 
    },
    stock: {
      type: Number,
      required: true,
      default:0,
    },
    price:{
      type: Number, 
      required: true, 
    },
  },
  { timestamps: true } // crée createdAt et updatedAt automatiquement
)

module.exports = mongoose.model('Product', Product)