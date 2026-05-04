import { Request, Response } from "express";
import CartModel from "../model/Cart";
import { AuthErrorCode } from "../interface/model";

export const addToCart = async (req: Request, res: Response) => {
  try{
    const cart = req.body;
    const productId = cart.productId;
    const ownerId = cart.ownerId;
    const itemExists = await CartModel.findOne({ productId, ownerId, status: 'active' });
    let response;
    if(itemExists){
      response = await CartModel.findOneAndUpdate(
        { productId, ownerId, status: 'active' }, 
        { $inc: { quantity: 1 } }, 
        { upsert: true, new: true }
      );
    }else{
      const newCart = {...cart, status: 'active' };
      response = await CartModel.create(newCart);
    }
    res.json({ msg: "Successfully added into your cart!", status: 200, data: response })

  }catch(error: unknown){
    console.error(error instanceof Error ? error.message : error)
    return res.json({ data: [], msg: AuthErrorCode.SOMETHING_WENT_WRONG, status: 500 });
  }
}

export const getCartItems = async (req: Request, res: Response) => {
  try{
    const ownerId = req?.user?.user?.id;
    if(ownerId){
      const cartItems = await CartModel.find({ ownerId, status: 'active' }).populate(
        {
          path: "productId", 
          select: "title image categoryId", 
          populate: {
            path: "categoryId",
            select: "category"
          }
        }
      );
      
      return res.json({ data: cartItems, msg: "cart items fetched successfully", status: 200 });
    }
    
  }catch(error: unknown) {
    console.error(error instanceof Error ? error.message : error)
    return res.json({ data: [], msg: AuthErrorCode.SOMETHING_WENT_WRONG, status: 500 })
  }
}

export const removeItemOnCart = async (req: Request, res: Response) => {
  try{
    const ownerId = req?.user?.user?.id;
    const _id = req.body.itemId;
    const cartItems = await CartModel.updateOne(
      { _id, ownerId },
      { $set: 
        { 
          status: 'inactive' 
        }
      });
    return res.json({ data: cartItems, msg: "Item removed successfully!", status: 200 });
  }catch(error: unknown){
    console.error(error instanceof Error ? error.message : error)
    return res.json({ data: [], msg: AuthErrorCode.SOMETHING_WENT_WRONG, status: 500 })
  }
}
