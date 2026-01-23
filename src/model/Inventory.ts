import { Schema, model } from "mongoose";
import { Inventory } from "../interface/model";

const InventorySchema = new Schema<Inventory>({
    productId: {
        type: Schema.Types.ObjectId,
        reference: "Product"
    },
    costumerId: {
        type: Schema.Types.ObjectId,
        reference: "User"
    },
    quantity:{
        type: String,
        required: true
    }
});

const InventoryModel = model<Inventory>("Inventory", InventorySchema);

export default InventoryModel;