import { Request, Response, NextFunction } from "express";
import ProductModel from "../model/Product";
import CartModel from "../model/Cart";
import { AuthErrorCode } from "../interface/model";

export const getAllProducts = async (
  req: Request,
  res: Response
) => {
  try {
    const products = await ProductModel.find();
    return res.json({ data: products, msg: "products fetched successfully", status: 200 });
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
    return res.json({ data: product[0], msg: "product fetched successfully", status: 200 });
  } catch (error: unknown) {
    console.error(error instanceof Error ? error.message : error)
    return res.json({ data: [], msg: AuthErrorCode.SOMETHING_WENT_WRONG, status: 500 });
  }
};

export const getProductsByCategory = async (req: Request, res: Response) => {
  const { categoryId } = req.body;
  try {
    const product = await ProductModel.find({ categoryId });
    return res.json({ data: product, msg: "products fetched successfully", status: 200 });
  } catch (error: unknown) {
    return res.json({ data: [], msg: AuthErrorCode.SOMETHING_WENT_WRONG, status: 500 });
  }
};

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

export const addStatus = async (req: Request, res: Response) => {
  try{
    const response = await CartModel.updateMany({ status: { $exists: false } },
  { $set: { status: "active" } });
  return res.json(response)
  }catch(error: unknown) {
  console.error(error instanceof Error ? error.message : error)
    return res.json({ data: [], msg: AuthErrorCode.SOMETHING_WENT_WRONG, status: 500 })
  }
}