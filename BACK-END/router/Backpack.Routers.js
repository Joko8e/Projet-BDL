const express = require("express");
const SacController = require("../controllers/Backpack.Controller");

const router = express();

router.post("/post", SacController.post);
router.get("/get", SacController.get);
router.get("/get/:id", SacController.getById)

module.exports = router;