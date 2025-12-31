const express = require("express");
const AuthController = require("../controllers/Auth.Controller.js");

const router = express();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);

module.exports = router;