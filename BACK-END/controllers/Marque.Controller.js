const createError = require("../helpers/CreateError.js");
const MarqueModel = require("../models/Marque.Model");
const AuthModel = require("../models/User.Model.js");

/**
 * Méthode pour créer un nouvel élément.
 * Utilise la méthode HTTP POST.
 *
 * Exemple de requête :
 *   ExempleModel.create(req.body)
 *
 * @param {object} req - Objet de requête (données à créer).
 * @param {object} res - Objet de réponse.
 * @returns {object} L'objet créé.
 */
const post = async (req, res, next) => {
  try {
    const marque = await MarqueModel.create(req.body);
    res.status(201).json(marque);
  } catch (error) {
     next(createError(error.status || 500, error.message, error.details));
  }
};

/**
 * Récupère la liste de tous les éléments.
 * Méthode HTTP GET.
 *
 * Exemple de requête :
 *  ExempleModel.find()
 *
 * @param {object} req - Objet de requête Express.
 * @param {object} res - Objet de réponse Express.
 * @returns {object[]} Liste des éléments.
 */
const get = async (req, res, next) => {
  try {
    const getMarque = await MarqueModel.find();
    res.status(200).json(getMarque)
  } catch (error) {
     next(createError(error.status || 500, error.message, error.details));
  }
};

/**
 * Récupère un élément par son identifiant.
 * Méthode HTTP GET.
 *
 * Exemple de requête :
 *   ExempleModel.findById(req.params.id)
 *
 * @param {object} req - Objet de requête Express (contient l'id dans req.params).
 * @param {object} res - Objet de réponse Express.
 * @returns {object} Élément correspondant à l'identifiant.
 */



const getById = async (req, res, next) => {
  
  try {
    const getMarqueByID = await MarqueModel.findById(req.params.id)
    console.log(req.params.id);
    if (!getById) return next(createError(404, "Marque not found")) 
    res.status(200).json(getMarqueByID)
  } catch (error) {
     next(createError(error.status || 500, error.message, error.details)); 
  }
};

/**
 * Supprime un élément par son identifiant.
 * Méthode HTTP DELETE.
 *
 * Exemple de requête :
 *   ExempleModel.findByIdAndDelete(req.params.id);
 *
 * @param {object} req - Objet de requête Express (contient l'id dans req.params).
 * @param {object} res - Objet de réponse Express.
 * @returns {object} Message de confirmation de suppression.
 */
const deleteById = async (req, res, next) => {
  try {
    const auth = await AuthModel.findById(req.auth.id)
    if(auth.role === "admin"){
     await MarqueModel.findByIdAndDelete(req.params.id)
    if(!deleteById) return next(createError(404, "Marque not found"))
      res.status(200).json("Marque supprimé")
    }
    res.status(403).json("Action non autorisée")
  } catch (error) {
     next(createError(error.status || 500, error.message, error.details));
  }
};

/**
 * Met à jour un élément existant par son identifiant.
 * Méthode HTTP PUT.
 *
 * Exemple de requête :
 *   ExempleModel.findByIdAndUpdate(
 *    req.params.id,
 *    req.body, {
 *      new: true
 *    });
 * @param {object} req - Objet de requête Express (contient l'id dans req.params et les données dans req.body).
 * @param {object} res - Objet de réponse Express.
 * @returns {object} Élément mis à jour.
 */
const updateById = async (req, res, next) => {
  try {
    const auth = await AuthModel.findById(req.auth.id)
    if (auth.role !== "admin") { 
    await MarqueModel.findByIdAndUpdate(req.params.id, req.body, {new:true})
    if(!updateById) return next(createError(404, "Marque Not Found"))
    res.status(200).json("Marque Modifié")
    } 
    res.status(403).json("Action non autorisée")
  } catch (error) {
    next(createError(error.status || 500, error.message, error.details)); 
  }
};

// Export des méthodes pour les réutiliser dans le router
module.exports = {
  post,
  get,
  getById,
  deleteById,
  updateById,
};
