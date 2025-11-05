const createError = require("../helpers/CreateError.js");
const SacModel = require("../models/Backpack.Models.js");

const post = async (req, res, next) => {
    try {
        const sac = await SacModel.create(req.body);
        res.status(201).json(sac);
    } catch (error) {
        next(createError(error.status || 500, error.message, error.details));
    }
}

const get = async (req, res, next) => {
    try {
        const getSac = await SacModel.find();
        res.status(200).json(getSac)
    } catch (error) {
        next(createError(error.status || 500, error.message, error.details));
    }
}

const getById = async(req, res, next) => {
    try {
        const sacById = await SacModel.findByID(req.params.id).populate();
        if(!getById) return next(createError(404, "Not found"));
        res.status(200).json(sacById)
    } catch (error) {
        next(createError(error.status || 500, error.message, error.details))
    }
}

module.exports = {
  post,
  get,
  getById,
  deleteById,
  updateById,
};
