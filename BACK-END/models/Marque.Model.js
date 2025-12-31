const mongoose = require('mongoose');

const Marque = mongoose.Schema(
  {
    nom: { 
        type: String, 
        required: true, 
        unique: true 
    },
    logo:{
        type: String, 
        required: true, 
    },
    description:{
        type: String, 
        required: true, 
    },
  },
  { timestamps: true } // crée createdAt et updatedAt automatiquement
)

module.exports = mongoose.model('Marque', Marque)