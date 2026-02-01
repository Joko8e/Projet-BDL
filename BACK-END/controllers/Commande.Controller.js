const createError = require("../helpers/CreateError.js");
const CommandeModel = require("../models/Commande.Model.js");
const ProductModel = require("../models/Product.Model.js");

// Création du Post d'une commande
const createCommande = async (req, res, next) => {
    try {
        const userId = req.auth._id || req.auth.id; // Récupérer l'ID de l'utilisateur authentifié
        const { items } = req.body;

        if (!req.auth) {
            return next(createError(401, "Utilisateur non authentifié"));
        }
        
        if (!items || items.length === 0) {
            return next(createError(400, "Le panier est vide"));
        }

        // récupérer les produits en base de données
        const productsIDs = items.map(item => item.product.toString()); // productsIDs est un tableau des IDs des produits dans la commande
        const products = await ProductModel.find({ _id: { $in: productsIDs } }); // $in permet de trouver tous les produits dont l'ID est dans le tableau productsIDs. 

        // Calculer le prix total
        let totalPrice = 0;

        const commandeItems = items.map(item => {
            const product = products.find(p => p._id.toString() === item.product);
            if (!product) {
                throw createError(404, `Produit non trouvé`);
            }
            const quantity = Number(item.quantity);
            if (isNaN(quantity) || quantity <= 0) {
                throw createError(400, `Quantité invalide pour le produit ${product.nom}`);
            }
            console.log("price", product.price);
            console.log("qty", item.quantity);

            const itemTotalPrice = product.price * quantity;
            totalPrice += itemTotalPrice;
            
            return {
                product: product._id,
                quantity,
                price: product.price 
            };
        });
        const commande = await CommandeModel.create({
            user : userId,
            items: commandeItems,
            totalPrice
        });
        res.status(201).json(commande);
    } catch (error) {
        next(createError(error.status || 500, error.message, error.details));
    }
}

// faire un get de toutes les commandes de toute les utilisateurs
const getCommandes = async (req, res, next) => {
    try {
        const commandes = await CommandeModel.find().populate('user', 'nom email').populate('items.product', 'nom price').sort({ createdAt: -1 });
        res.status(200).json(commandes);
    } catch (error) {
        next(createError(error.status || 500, error.message, error.details));
    }
}

// faire un get d'une commande par son ID
const getCommandeByUser = async (req, res, next) => {
    try {
        if(!req.auth) {
            return next (createError (401, "Utilisateur non authentifié"));
        }
        const userId = req.auth._id || req.auth.id; // Récupérer l'ID de l'utilisateur authentifié
        const commande = await CommandeModel.find({user: userId}).populate('items.product').sort({ createdAt: -1 }); // j'utilise find au lieu de findById pour récupérer toutes les commandes de l'utilisateur
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
    createCommande,
    getCommandes,
    getCommandeByUser,
    deleteCommandeById,
    updateCommandeById
}