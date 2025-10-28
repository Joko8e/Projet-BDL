const mongoose = require('mongoose');

const User = mongoose.Schema(
  {
    // CODE HERE
  },
  { timestamps: true } // crée createdAt et updatedAt automatiquement
)

module.exports = mongoose.model('User', User)