const express = require("express");
const MarqueController = require("../controllers/Marque.Controller.js");

const router = express();

// définir vos routes ici : Controller.Methode
router.post("/post", MarqueController.post);
router.get("/get", MarqueController.get);
router.get("/get/:id", MarqueController.getById);
router.delete("/delete/:id", MarqueController.deleteById);
router.put("/put/:id", MarqueController.updateById);


module.exports = router;
