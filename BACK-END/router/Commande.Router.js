const express = require("express");
const CommandeController = require("../controllers/Commande.Controller.js");

const router = express();

router.post("/post", CommandeController.post);
router.get("/get", CommandeController.getCommandes);
router.get("/get/:id", CommandeController.getCommandeByID);
router.delete("/delete/:id", CommandeController.deleteCommandeById);

module.exports = router;

