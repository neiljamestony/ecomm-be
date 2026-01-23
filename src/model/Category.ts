import { Schema, model } from "mongoose";
import { ICategory } from "../interface/model";

const CategorySchema = new Schema<ICategory>({
  category: {
    type: String,
    required: true,
  },
});

const CategoryModel = model<ICategory>("Category", CategorySchema);

export default CategoryModel;