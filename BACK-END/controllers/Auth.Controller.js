const ENV = require("../config/Env.js");
const createError = require("../helpers/CreateError.js");
const AuthModel = require("../models/User.Model.js");

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Methode pour s'inscrire
const register = async (req, res, next) => {
  try {
    // Hashage du mot de passe avec bcrypt
    const passwordHash = await bcrypt.hash(req.body.password, 10);
    const user = await AuthModel.create({
      ...req.body,
      password: passwordHash
    });
    res.status(201).json(user)
  } catch (error) {
     next(createError(error.status || 500, error.message, error.details));
  }
};

// Methode pour se connecter
const login = async (req, res, next) => {
  try {
    // Recherche de l'utilisateur par email
    const user = await AuthModel.findOne({ email: req.body.email });
    // Si l'utilisateur n'existe pas, renvoyer une erreur
    if (!user) {
      return next(createError(404, "Utilisateur non trouvé"));
    }
    // Comparaison du mot de passe fourni avec le mot de passe hashé en base de données
    const comparePassword = await bcrypt.compare(req.body.password, user.password);
    // Si le mot de passe ne correspond pas, renvoyer une erreur 400
    if (!comparePassword) {
      return next(createError(400, "Wrong password or email"));
    }

    // Génération d'un token JWT
    const token = jwt.sign({ id: user._id }, ENV.JWT_SECRET, { expiresIn: ENV.JWT_EXPIRES_IN });

    // on retire le mot de passe de la réponse
    const { password, ...rest } = user._doc;
    res.cookie("access_token", token, { httpOnly: true })
      .status(200).json(rest);
  } catch (error) {
     next(createError(error.status || 500, error.message, error.details));
  }
};

module.exports = {
  register,
  login,
};
