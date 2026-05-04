import { Request, Response } from "express";
import OrderModel from "../model/Order"
import CartModel from "../model/Cart";
import { AuthErrorCode } from "../interface/model";


export const addOrder = async (req: Request, res: Response) => {
    try{
        let orderResponse;
        let cartResponse;
        const orderRequest = req.body.items;
        if(!orderRequest.cartIds.length){
            orderResponse = await OrderModel.create(orderRequest);
            if(orderResponse){
                return res.json({ data: orderResponse, msg: "Order submitted successfully", status: 200 });
            }
        }else{
            orderResponse = await OrderModel.create(orderRequest);
            cartResponse = await CartModel.updateMany(
                {
                    _id: { 
                        $in: orderRequest.cartIds 
                    }
                },
                {
                    $set: {
                        status: "checked_out"
                    }
                }
            );
            if(orderResponse && cartResponse){
                return res.json({ data: orderResponse, msg: "Order submitted successfully", status: 200 });
            }
        }

        
    }catch(error: unknown){
        console.error(error instanceof Error ? error.message : error)
        return res.json({ data: [], msg: AuthErrorCode.SOMETHING_WENT_WRONG, status: 500 });
    }
}