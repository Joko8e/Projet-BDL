const express = require("express");
const ChaussureController = require("../controllers/Chaussures.Controller.js");

const router = express();

router.post("/post", ChaussureController.post);
router.get("/get", ChaussureController.getShoes);
router.get("/get/:id", ChaussureController.getShoesByID);
router.delete("/delete/:id", ChaussureController.deleteShoesById);
router.put("/put/:id", ChaussureController.updateShoesById);

module.exports = router;