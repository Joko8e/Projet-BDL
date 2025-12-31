const express = require("express");
const MarqueController = require("../controllers/Marque.Controller.js");
const AuthMiddleware = require("../middlewares/AuthMiddleware.js");

const router = express();

// définir vos routes ici : Controller.Methode
router.post("/post", AuthMiddleware, MarqueController.post);
router.get("/get", MarqueController.get);
router.get("/get/:id", MarqueController.getById);
router.delete("/delete/:id", AuthMiddleware, MarqueController.deleteById);
router.put("/put/:id", AuthMiddleware, MarqueController.updateById);


module.exports = router;
