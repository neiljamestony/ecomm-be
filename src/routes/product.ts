import express from "express";
import {
  getAllProducts,
  getProductById,
  getProductsByCategory,
  buyNow,
  addStatus,
} from "../controller/product";
import { checkIfAuthorized } from "../middleware/middleware";

const router = express.Router();

router.get("/get-products", getAllProducts);
router.post("/get-product-by-id", getProductById);
router.post("/get-products-by-category", getProductsByCategory);
router.post("/buy-now", checkIfAuthorized, buyNow);
router.post("/add-status", addStatus);

export default router;
