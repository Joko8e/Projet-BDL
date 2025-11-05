const createError = require("../helpers/CreateError.js");
const ChaussureModel = require("../models/Chaussure.Model.js");

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
        const deleteShoes = await ChaussureModel.findByIdAndDelete(req.params.id);
        if(!deleteShoesById) return next(createError(404, "Not found"))
        res.status(200).json("produit supprimé");
    } catch (error) {
        next(createError(error.status || 500, error.message, error.details));
    }
}

const updateShoesById = async ( req, res, next) => {
    try {
        const updatedShoes = await ChaussureModel.findByIdAndUpdate(req.params.id, req.body, {new:true});
        if(!updateShoesById) return next(createError(404, "Not found"))
        res.status(200).json("produit modifié")
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