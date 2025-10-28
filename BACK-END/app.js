// IMPORT PACKAGES
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// IMPORT FILES
const ENV = require("./config/Env.js");
const connectDB = require("./config/Mongo.js");
const errorMiddleware = require("./middlewares/ErrorMiddleware.js");

// IMPORT ROUTES
const authRouter = require("./router/Auth.Router.js");
const MarqueRouter = require("./router/Marque.Router.js");

// CONNEXION MONGO
connectDB(ENV.MONGO_URI, ENV.DB_NAME);

// APP EXPRESS
const app = express();

// MIDDLEWARES
/**
 * app.use(express.json());
 * → permet à Express de comprendre et parser automatiquement le body JSON des requêtes (sinon req.body serait undefined).
 */
app.use(express.json());
/**
 * app.use(cookieParser());
 * → lit les cookies envoyés par le client et les rend accessibles dans req.cookies.
 */
app.use(cookieParser());
/**
 * app.use(cors({...}));
 * → active le CORS (Cross-Origin Resource Sharing) pour autoriser des requêtes venant de du front.
 */
app.use(
  cors({
    origin: [ENV.WEB_APP_URL, ENV.DOMAINE_URL],
    credentials: true,
  })
);

// PREFIX
app.use("/api/auth", authRouter);
app.use("/api/marque", MarqueRouter);

// Middleware d'erreurs (toujours en dernier 🚨)
app.use(errorMiddleware);

module.exports = app;
