const mongoose = require('mongoose');

const Chaussure = mongoose.Schema(
  {
    id_marque:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Marque',
      required: true
    },
    marque: { 
      type: String, 
      required: true, 
    },
    modele:{
      type: String, 
      required: true, 
    },
    photo:{
      type: String, 
      required: true, 
    },
    description:{
      type: String, 
      required: true, 
    },
    prix:{
      type: Number, 
      required: true, 
    },
  },
  { timestamps: true } // crée createdAt et updatedAt automatiquement
)

module.exports = mongoose.model('Chaussure', Chaussure)