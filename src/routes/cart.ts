import express from 'express'
import { checkIfAuthorized } from '../middleware/middleware';
import { getCartItems, removeItemOnCart, addToCart } from '../controller/cart';


const router = express.Router();

router.get("/get-cart-items", checkIfAuthorized, getCartItems);
router.post("/remove-item-on-cart", checkIfAuthorized, removeItemOnCart);
router.post("/add-to-cart", checkIfAuthorized, addToCart);

export default router;