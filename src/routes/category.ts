import express from 'express'
import { getAllProductsCategory } from '../controller/category';

const router = express.Router();

router.get("/get-categories", getAllProductsCategory);

export default router;