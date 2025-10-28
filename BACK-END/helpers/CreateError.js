const createError = (status, message,  details = null) => {
  // Crée une nouvelle instance d'erreur vide
  const error = new Error()
  // Définit le code d'état de l'erreur 
	// en  fonction du paramètre "status"
  error.status = status
  // Définit le message d'erreur 
	// en fonction du paramètre "message"
  error.message = message
  // Pour infos supplémentaires
  error.details = details; 
  // Renvoie l'instance d'erreur personnalisée
  return error
}

module.exports = createError