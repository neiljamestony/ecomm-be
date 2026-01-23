import { Schema, model } from "mongoose";
import { ICart } from "../interface/model";

const CartSchema = new Schema<ICart>({
    productName: {
        type: String,
        required: true
    },
    unitPrice: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: false
    }
})

const CartModel = model<ICart>("Cart", CartSchema);

export default CartModel;