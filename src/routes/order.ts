import express from "express";
import { addOrder } from "../controller/order";
import { checkIfAuthorized } from "../middleware/middleware";

const router = express.Router();

router.post('/add', checkIfAuthorized, addOrder);

export default router;