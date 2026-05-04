import { Request, Response } from "express";
import CategoryModel from "../model/Category";
import { AuthErrorCode } from "../interface/model";

export const getAllProductsCategory = async (req: Request, res: Response) => {
  try {
    const categories = await CategoryModel.find();
    return res.json({ data: categories, msg: "categories fetched successfully", status: 200 });
  } catch (error: unknown) {
    console.error(error instanceof Error ? error.message : error)
    return res.json({ data: [], msg: AuthErrorCode.SOMETHING_WENT_WRONG, status: 500 });
  }
}