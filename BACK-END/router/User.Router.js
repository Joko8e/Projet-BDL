const express = require('express');
const UserController = require('../controllers/User.Controller.js');
const AuthController = require('../controllers/Auth.Controller.js');
const AuthMiddleware = require('../middlewares/AuthMiddleware.js');
const router = express.Router();

// définir vos routes ici : Controller.Methode
router.post('/register', AuthController.register);
router.get('/get', UserController.getUser);
router.get('/get/:id', UserController.getUserById);
router.delete('/delete/:id', AuthMiddleware, UserController.deleteUser);
router.put('/put/:id', UserController.updateUser);

module.exports = router;