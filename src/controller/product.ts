import { Request, Response, NextFunction } from "express";
import ProductModel from "../model/Product";

export const insertProduct = async (req: Request, res: Response) => {
  res.json({ data: req.body });
};

export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await ProductModel.find();
    res
      .status(201)
      .json({ data: products, msg: "products fetched successfully" });
  } catch (err) {
    next(err);
    res.status(500).json({ data: [], msg: "Error fetching products" });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  const { _id } = req.body;
  try {
    const product = await ProductModel.find({
      _id,
    });
    res
      .status(201)
      .json({ data: product, msg: "products fetched successfully" });
  } catch (error) {
    res.status(500).json({ data: [], msg: "Error fetching product" });
  }
};

export const getProductsByCategory = async (req: Request, res: Response) => {
  const { category } = req.body;
  try {
    const product = await ProductModel.find({ category });
    res
      .status(201)
      .json({ data: product, msg: "products fetched successfully" });
  } catch (error) {
    res.status(500).json({ data: [], msg: "Error fetching products" });
  }
};
