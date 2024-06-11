import express from "express";
import {
  insertProduct,
  getAllProducts,
  getProductById,
  getProductsByCategory,
} from "../controller/product";
const router = express.Router();

router.post("/add-product", insertProduct);
router.post("/get-products-by-category", getProductsByCategory);
router.get("/get-products", getAllProducts);
router.get("/get-product-by-id", getProductById);

export default router;
