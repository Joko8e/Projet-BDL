const ENV = require("../config/Env.js");
const createError = require("../helpers/CreateError.js");
const AuthModel = require("../models/User.Model.js");
const { sendEmail } = require("../services/nodemailer.js");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Methode pour s'inscrire
const register = async (req, res, next) => {
  try {
    // Hashage du mot de passe avec bcrypt
    const passwordHash = await bcrypt.hash(req.body.password, 10);
    const user = await AuthModel.create({
      ...req.body,
      password: passwordHash,
      isVerified: false,
    });
    // Génération d'un token de vérification (par exemple, un token JWT)
    // C'est comme un ticket qui expire dans 5 minutes ⏳
    const verificationToken = jwt.sign(
      { id: user._id }, 
      ENV.JWT_SECRET, 
      { expiresIn: '24h' }
    );
    // Envoi de l'email de vérification
    await sendEmail(req.body, verificationToken);
    // Réponse au client
    res.status(201).json({user, message: "Utilisateur créé avec succès. Veuillez vérifier votre email." });

  } catch (error) {
     next(createError(error.status || 500, error.message, error.details));
  }
};

// Cette fonction va vérifier l'email de l'utilisateur
// C'est comme vérifier un ticket d'entrée à un concert! 🎫
const verifyEmail = async (req, res, next) => {
  try {
    // On récupère le token depuis l'URL (comme un code secret! 🔑)
    const { token } = req.params;

    // On vérifie si le token est valide
    // C'est comme quand le videur vérifie si ton billet est authentique! 🕵️
    const decoded = jwt.verify(token, ENV.JWT_SECRET);


    // Maintenant on active le compte de l'utilisateur en mettant isVerified à true

    await AuthModel.findByIdAndUpdate(decoded.id, { isVerified: true },
      { new: true}
    );

    // on redirecte vers l'application front-end avec un paramètre indiquant le succès
    return res.redirect(`${ENV.WEB_APP_URL}/login?verified=true`)

  } catch (error) {
  // vous pouviez aussi utiliser la fonciton next() si jamais.
    console.error('Erreur de vérification:', error);
    return res.status(400).json({ message: 'Lien invalide ou expiré.' });
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

    // Vérification si l'utilisateur a confirmé son email
    if (user.isVerified === false) {
    return next(createError(403, "Veuillez vérifier votre email avant de vous connecter."));
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
  verifyEmail,
};
