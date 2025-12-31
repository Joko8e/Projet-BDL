const mongoose = require('mongoose');

const User = mongoose.Schema(
  {
    nom :{
      type: String,
      required: true, 
    },
    prenom:{
      type: String,
      required: true, 
    },
    email:{
      type: String,
      required: true,
      unique: true, 
    },
    password:{
      type: String,
      // minLength: 12,
      required: true, 
    },
    adresse:{
      type: String,
      required: true, 
    },
    ville: {
      type: String,
      required: true, 
    },
    code_postal:{
      type: String,
      required: true, 
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user'
    },
  },
  { timestamps: true } // crée createdAt et updatedAt automatiquement
)

module.exports = mongoose.model('User', User)