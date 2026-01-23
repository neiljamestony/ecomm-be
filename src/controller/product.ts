import { Request, Response, NextFunction } from "express";
import ProductModel from "../model/Product";
import CategoryModel from "../model/Category";
import CartModel from "../model/Cart";
import InventoryModel from "../model/Inventory";
import { somethingWentWrong } from "../utils/global";

export const insertProduct = async (req: Request, res: Response) => {
  res.json(req.body);
  const categories = await CategoryModel.create(req.body);
  console.log("categories", categories);
};

export const addToCart = async (req: Request, res: Response) => {
  try{
    const cart = req.body;
    const addedToCart = await CartModel.create(cart);
    if(addedToCart){
      return res.status(201).json({ msg: "Successfully added into your cart!" })
    }else{
      return res.status(500).json({ data: [], msg: somethingWentWrong });
    }
  }catch(error: unknown){
    console.error(error instanceof Error ? error.message : error)
    return res.status(500).json({ data: [], msg: "Error inserting to cart" });
  }
}

export const getCartItems = async (req: Request, res: Response) => {
  try{
    const cartItems = await CartModel.find();
    if(cartItems){
      return res.status(201).json({ data: cartItems, msg: "cart items fetched successfully" });
    }else{
      return res.status(500).json({ data: [], msg: somethingWentWrong });
    }
  }catch(error: unknown) {
    console.error(error instanceof Error ? error.message : error)
    return res.status(500).json({ data: [], msg: "Error fetching cart items" })
  }
}

export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await ProductModel.find();
    if(products){

    }else{
      return res.status(500).json({ data: [], msg: somethingWentWrong });
    }
    return res
      .status(201)
      .json({ data: products, msg: "products fetched successfully" });
  } catch (error: unknown) {
    console.error(error instanceof Error ? error.message : error)
    next(error);
    return res.status(500).json({ data: [], msg: "Error fetching products" });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  const { _id } = req.body;
  try {
    const product = await ProductModel.find({
      _id,
    });
    if(product){
      return res.status(201).json({ data: product[0], msg: "product fetched successfully" });
    }else{
      return res.status(500).json({ data: [], msg: somethingWentWrong });
    }
  } catch (error: unknown) {
    console.error(error instanceof Error ? error.message : error)
    return res.status(500).json({ data: [], msg: "Error fetching product" });
  }
};

export const getProductsByCategory = async (req: Request, res: Response) => {
  const { categoryId } = req.body;
  try {
    const product = await ProductModel.find({ categoryId });
    if(product){
      return res.status(201).json({ data: product, msg: "products fetched successfully" });
    }else{
      return res.status(500).json({ data: [], msg: somethingWentWrong });
    }
  } catch (error: unknown) {
    return res.status(500).json({ data: [], msg: "Error fetching products" });
  }
};

export const getAllProductsCategory = async (req: Request, res: Response) => {
  try {
    const categories = await CategoryModel.find();
    if(categories){
      return res.status(201).json({ data: categories, msg: "categories fetched successfully" });
    }else{
      return res.status(500).json({ data: [], msg: somethingWentWrong });
    }
  } catch (error: unknown) {
    console.error(error instanceof Error ? error.message : error)
    return res.status(500).json({ data: [], msg: "Error fetching categories" });
  }
}

export const buyNow = async (req: Request, res: Response) => {
  try{
    const item = req.body;
    res.json({ request: item })
    // await InventoryModel.create(item);
  }catch(error: unknown){
    console.error(error instanceof Error ? error.message : error)
    return res.status(500).json({ data: [], msg: "Error buying item" })
  }
}