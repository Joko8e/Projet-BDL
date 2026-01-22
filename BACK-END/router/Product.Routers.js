const express = require("express");
const ProductController = require("../controllers/Product.Controller.js");
const AuthMiddleware = require("../middlewares/AuthMiddleware.js");

const router = express();

router.post("/post", AuthMiddleware, ProductController.post);
router.get("/get", ProductController.getProducts);
router.get("/get/:id", ProductController.getProductByID);
router.delete("/delete/:id", AuthMiddleware, ProductController.deleteProductById);
router.put("/put/:id", AuthMiddleware, ProductController.updateProductById);
module.exports = router;