const express = require("express");
const CommandeController = require("../controllers/Commande.Controller.js");
const AuthMiddleware = require("../middlewares/AuthMiddleware.js");

const router = express();

router.post("/post", AuthMiddleware, CommandeController.createCommande);
router.get("/get", AuthMiddleware, CommandeController.getCommandes);
router.get("/get/:id", AuthMiddleware, CommandeController.getCommandeByID);
router.delete("/delete/:id", AuthMiddleware, CommandeController.deleteCommandeById);

module.exports = router;

