const createError = require("../helpers/CreateError.js");
const CommandeModel = require("../models/Commande.Model.js");

// Création du Post d'une commande
const post = async (req, resizeBy, next) => {
    try {
        const commande = await CommandeModel.create(req.body);
        res.status(201).json(commande);
    } catch (error) {
        next(createError(error.status || 500, error.message, error.details));
    }
}

// faire un get de toutes les commandes
const getCommandes = async (req, res, next) => {
    try {
        const commandes = await CommandeModel.find().populate('user').populate('produits');
        res.status(200).json(commandes);
    } catch (error) {
        next(createError(error.status || 500, error.message, error.details));
    }
}

// faire un get d'une commande par son ID
const getCommandeByID = async (req, res, next) => {
    try {
        const commande = await CommandeModel.findById(req.params.id).populate('user').populate('produits');
        res.status(200).json(commande);
    } catch (error) {
        next(createError(error.status || 500, error.message, error.details));
    }
}

// supprimer une commande par son ID
const deleteCommandeById = async (req, res, next) => {
    try {
        const deleteCommande = await CommandeModel.findByIdAndDelete(req.params.id);
        if(!deleteCommande) return next(createError(404, "Not found"))
        res.status(200).json("commande supprimée");
    } catch (error) {
        next(createError(error.status || 500, error.message, error.details));
    }
}

// Modidier une commande par son ID
const updateCommandeById = async (req, res, next) => {
    try {
        const updatedCommande = await CommandeModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if(!updatedCommande) return next(createError(404, "Not found"));
        res.status(200).json(updatedCommande);
    } catch (error) {
        next(createError(error.status || 500, error.message, error.details));
    }
}

module.exports = {
    post,
    getCommandes,
    getCommandeByID,
    deleteCommandeById,
    updateCommandeById
}