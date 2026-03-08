import { Request, Response, NextFunction } from "express";
import ProductModel from "../model/Product";
import CategoryModel from "../model/Category";
import CartModel from "../model/Cart";
import InventoryModel from "../model/Inventory";
import { AuthErrorCode } from "../interface/model";

export const insertProduct = async (req: Request, res: Response) => {
  res.json(req.body);
  const categories = await CategoryModel.create(req.body);
  console.log("categories", categories);
};

export const addToCart = async (req: Request, res: Response) => {
  try{
    const cart = req.body;
    const productId = cart.productId;
    const ownerId = cart.ownerId;
    const itemExists = await CartModel.findOne({ productId, ownerId });
    let response;
    if(itemExists){
      response = await CartModel.findOneAndUpdate(
        { productId, ownerId }, 
        { $inc: { quantity: 1 } }, 
        { upsert: true, new: true }
      );
    }else{
      response = (await CartModel.create(cart));
    }
    res.json({ msg: "Successfully added into your cart!", status: 201, data: response })

  }catch(error: unknown){
    console.error(error instanceof Error ? error.message : error)
    return res.json({ data: [], msg: AuthErrorCode.SOMETHING_WENT_WRONG, status: 500 });
  }
}

export const getCartItems = async (req: Request, res: Response) => {
  try{
    const ownerId: string = req.body.owner;
    const cartItems = await CartModel.find({ ownerId }).populate(
      {
        path: "productId", 
        select: "title image categoryId", 
        populate: {
          path: "categoryId",
          select: "category"
        }
      });
    return res.json({ data: cartItems, msg: "cart items fetched successfully", status: 201 });
  }catch(error: unknown) {
    console.error(error instanceof Error ? error.message : error)
    return res.json({ data: [], msg: AuthErrorCode.SOMETHING_WENT_WRONG, status: 500 })
  }
}

export const getAllProducts = async (
  req: Request,
  res: Response
) => {
  try {
    const products = await ProductModel.find();
    return res.json({ data: products, msg: "products fetched successfully", status: 201 });
  } catch (error: unknown) {
    console.error(error instanceof Error ? error.message : error)
    return res.json({ data: [], msg: AuthErrorCode.SOMETHING_WENT_WRONG, status: 500 });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  const { _id } = req.body;
  try {
    const product = await ProductModel.find({
      _id,
    });
    return res.json({ data: product[0], msg: "product fetched successfully", status: 201 });
  } catch (error: unknown) {
    console.error(error instanceof Error ? error.message : error)
    return res.json({ data: [], msg: AuthErrorCode.SOMETHING_WENT_WRONG, status: 500 });
  }
};

export const getProductsByCategory = async (req: Request, res: Response) => {
  const { categoryId } = req.body;
  try {
    const product = await ProductModel.find({ categoryId });
    return res.json({ data: product, msg: "products fetched successfully", status: 201 });
  } catch (error: unknown) {
    return res.json({ data: [], msg: AuthErrorCode.SOMETHING_WENT_WRONG, status: 500 });
  }
};

export const getAllProductsCategory = async (req: Request, res: Response) => {
  try {
    const categories = await CategoryModel.find();
    return res.json({ data: categories, msg: "categories fetched successfully", status: 201 });
  } catch (error: unknown) {
    console.error(error instanceof Error ? error.message : error)
    return res.json({ data: [], msg: AuthErrorCode.SOMETHING_WENT_WRONG, status: 500 });
  }
}

export const buyNow = async (req: Request, res: Response) => {
  try{
    const item = req.body;
    res.json({ request: item })
    // await InventoryModel.create(item);
  }catch(error: unknown){
    console.error(error instanceof Error ? error.message : error)
    return res.json({ data: [], msg: AuthErrorCode.SOMETHING_WENT_WRONG, status: 500 })
  }
}