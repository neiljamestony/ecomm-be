import express from "express";
import {
  insertProduct,
  getAllProducts,
  getProductById,
  getProductsByCategory,
  getAllProductsCategory,
  addToCart,
  getCartItems,
  buyNow
} from "../controller/product";
import { checkIfAuthorized } from "../middleware/middleware";
const router = express.Router();

router.post("/add-product", insertProduct);
router.post("/get-products-by-category", getProductsByCategory);
router.get("/get-products", getAllProducts);
router.post("/get-product-by-id", getProductById);
router.get("/get-categories", getAllProductsCategory);
router.post("/add-to-cart", checkIfAuthorized, addToCart);
router.post("/get-cart-items", checkIfAuthorized, getCartItems);
router.post("/buy-now", checkIfAuthorized, buyNow);

export default router;
