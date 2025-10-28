// Middleware centralisé pour gérer les erreurs dans Express
// Il prend 4 paramètres : err (l'erreur), req (la requête), res (la réponse), next (la fonction suivante)
const errorMiddleware = (err, req, res, next) => {
  
  // On récupère le code HTTP de l'erreur si défini, sinon on met 500 (erreur serveur)
  const status = err.status || 500;
  
  // On récupère le message de l'erreur si défini, sinon on met un message générique
  const message = err.message || "Internal Server Error";
  
  // Optionnel : on récupère des détails supplémentaires de l'erreur si définis, sinon null
  const details = err.details || null;

  // On envoie la réponse au client
  // status : le code HTTP (ex : 400, 401, 500)
  // json : un objet qui contient success=false et un objet error avec toutes les infos
  res.status(status).json({ 
    success: false,
    error : { status, message, details }
  });
};

// On exporte ce middleware pour pouvoir l'utiliser dans app.js
module.exports = errorMiddleware;
