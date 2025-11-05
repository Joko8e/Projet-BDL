const mongoose = require('mongoose');

const Sac = mongoose.Schema(
  {
    id_marque:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Marque',
      required: true
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
  { timestamps: true }
)

module.exports = mongoose.model('Sac', Sac)