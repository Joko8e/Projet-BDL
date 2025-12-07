const express = require("express");
const ChaussureController = require("../controllers/Chaussures.Controller.js");
const AuthMiddleware = require("../middlewares/AuthMiddleware.js");

const router = express();

router.post("/post", AuthMiddleware, ChaussureController.post);
router.get("/get", ChaussureController.getShoes);
router.get("/get/:id", ChaussureController.getShoesByID);
router.delete("/delete/:id", AuthMiddleware, ChaussureController.deleteShoesById);
router.put("/put/:id", AuthMiddleware, ChaussureController.updateShoesById);

module.exports = router;