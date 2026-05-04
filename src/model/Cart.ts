import { Schema, model } from "mongoose";
import { ICart } from "../interface/model";

const CartSchema = new Schema<ICart>({
    productId: {
        type: Schema.Types.ObjectId,
        ref: "Product"
    },
    unitPrice: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    ownerId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    status: {
        type: String,
        default: "active",
        required: true
    }
})

const CartModel = model<ICart>("Cart", CartSchema);

export default CartModel;