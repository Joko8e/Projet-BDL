const createError = require("../helpers/CreateError.js");
const AuthModel = require("../models/User.Model.js");

// Methode pour s'inscrire
const register = async (req, res) => {
  try {
    // CODE HERE...
  } catch (error) {
     next(createError(error.status || 500, error.message, error.details));
  }
};

// Methode pour se connecter
const login = async (req, res) => {
  try {
    // CODE HERE...
  } catch (error) {
     next(createError(error.status || 500, error.message, error.details));
  }
};

module.exports = {
  register,
  login,
};
