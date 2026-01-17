const createError = require("../helpers/CreateError.js");
const UserModel = require("../models/User.Model.js");
const Env = require("../config/Env.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const sendEmail = require("../services/nodemailer.js");
const AuthModel = require("../models/User.Model.js");


const getUser = async (req, res, next) => {
    try {
        const user = await UserModel.find();
        res.status(200).json(user);
    } catch (error) {
        next(createError(error.status || 500, error.message, error.details));
    }
}

const getUserById = async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.params.id);
        if(!user) return next(createError(404, "User not found"));
        res.status(200).json(user); 
    } catch (error) {
        next(createError(error.status || 500, error.message, error.details));
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const user = await UserModel.findByIdAndDelete(req.params.id);
        if (AuthModel.role == "admin") {
           if(!user) return next(createError(404, "User not found"));
            res.status(200).json({ message: "User delete" }); 
        }
        res.status(403).json("Action non autorisée")
    } catch (error) {
        next(createError(error.status || 500, error.message, error.details));
    }
}

const updateUser = async (req, res, next) => {
    try {
        const user = await UserModel.findByIdAndUpdate(req.params.id, req.body, {new:true});
        if(!user) return next(createError(404, "User not found"));
        res.status(200).json(user);
    } catch (error) {
        next(createError(error.status || 500, error.message, error.details));
    }
}

module.exports = {
    getUser,
    getUserById,
    deleteUser,
    updateUser
};