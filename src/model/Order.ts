import { Schema, model } from "mongoose";
import { IOrder } from "../interface/model";

const orderSchema = new Schema<IOrder>({
    items: [
        {
            productId: {
                type: Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            unitPrice: {
                type: Number,
                required: true
            }
        }
    ],
    ownerId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true,
    },
    zipCode: {
        type: String,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    modeOfPayment: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
})

const OrderModel = model<IOrder>('Order', orderSchema);

export default OrderModel;