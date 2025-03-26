const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// Định tuyến API
router.get("/", productController.getAllProducts);
router.post("/", productController.addProduct);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);
router.get("/search", productController.searchProducts);

module.exports = router;
