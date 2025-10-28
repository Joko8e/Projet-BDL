const dotenv = require("dotenv");

dotenv.config();

// EN CAS DE BESOIN VOUS POUVEZ AJOUTER DES VARIABLES DANS CETTE OBJET
const ENV = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  DB_NAME: process.env.DB_NAME,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS,
  WEB_APP_URL: process.env.WEB_APP_URL,
  DOMAINE_URL: process.env.DOMAINE_URL
};

module.exports = ENV;