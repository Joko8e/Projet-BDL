const createError = require("../helpers/CreateError.js");
const ChaussureModel = require("../models/Chaussure.Model.js");
const AuthModel = require("../models/User.Model.js");

const post = async (req,res, next) => {
    try {
        const chaussure = await ChaussureModel.create(req.body);
        res.status(201).json(chaussure);
    } catch (error) {
        next(createError(error.status || 500, error.message, error.details));
    }
};

const getShoes = async (req, res, next) => {
    try {
        const shoes = await ChaussureModel.find().populate("id_marque")
        res.status(200).json(shoes)
    } catch (error) {
        next(createError(error.status || 500, error.message, error.details));
    }
};

const getShoesByID = async (req, res, next) => {
    try {
        const shoesByID = await ChaussureModel.findById(req.params.id).populate();
        if(!getShoesByID) return next(createError(404, "Not Found"))
        res.status(200).json(shoesByID);
    } catch (error) {
        next(createError(error.status || 500, error.message, error.details));
    }
}


const deleteShoesById = async (req, res, next) => {
    try {
        const auth = await AuthModel.findById(req.auth.id)
        
        if (auth.role === "admin") {
            const deleteProduct = await ChaussureModel.findByIdAndDelete(req.params.id);
            if(!deleteProduct) return next(createError(404, "Not found"))
            return res.status(200).json("produit supprimé")
        }
        return res.status(403).json("Action non autorisée")
    } catch (error) {
        next(createError(error.status || 500, error.message, error.details));
    }
}

const updateShoesById = async ( req, res, next) => {
    try {
        const auth = await AuthModel.findById(req.auth.id)
        if (auth.role === "admin") {
            const updateProduct = await ChaussureModel.findByIdAndUpdate(req.params.id, req.body, {new:true});
            if(!updateProduct) return next(createError(404, "Not found"))
            return res.status(200).json("produit modifié")
        }
        return res.status(403).json("Action non autorisée")
    } catch (error) {
        next(createError(error.status || 500, error.message, error.details));
    }
} 



module.exports = {
    post,
    getShoes,
    getShoesByID,
    deleteShoesById,
    updateShoesById,
}