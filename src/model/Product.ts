import { Schema, model } from "mongoose";
import { IProduct } from "../interface/model";

const ProductSchema = new Schema<IProduct>({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    reference: "Category",
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const ProductModel = model<IProduct>("Product", ProductSchema);

export default ProductModel;
