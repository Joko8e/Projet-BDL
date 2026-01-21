const createError = require("../helpers/CreateError.js");
const ProductModel = require("../models/Product.Model.js");
const AuthModel = require("../models/User.Model.js");

const post = async (req,res, next) => {
    try {
        const product = await ProductModel.create(req.body);
        res.status(201).json(product);
    } catch (error) {
        next(createError(error.status || 500, error.message, error.details));
    }
};

const getProducts = async (req, res, next) => {
    try {
        const products = await ProductModel.find().populate("id_marque")
        res.status(200).json(products)
    } catch (error) {
        next(createError(error.status || 500, error.message, error.details));
    }
};

const getProductByID = async (req, res, next) => {
    try {
        const productByID = await ProductModel.findById(req.params.id).populate();
        if(!productByID) return next(createError(404, "Not Found"))
        res.status(200).json(productByID);
    } catch (error) {
        next(createError(error.status || 500, error.message, error.details));
    }
}


const deleteProductById = async (req, res, next) => {
    try {
        const auth = await AuthModel.findById(req.auth.id)
        
        if (auth.role === "admin") {
            const deleteProduct = await ProductModel.findByIdAndDelete(req.params.id);
            if(!deleteProduct) return next(createError(404, "Not found"))
            return res.status(200).json("produit supprimé")
        }
        return res.status(403).json("Action non autorisée")
    } catch (error) {
        next(createError(error.status || 500, error.message, error.details));
    }
}

const updateProductById = async ( req, res, next) => {
    try {
        const auth = await AuthModel.findById(req.auth.id)
        if (auth.role === "admin") {
            const updateProduct = await ProductModel.findByIdAndUpdate(req.params.id, req.body, {new:true});
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
    getProducts,
    getProductByID,
    deleteProductById,
    updateProductById,
}