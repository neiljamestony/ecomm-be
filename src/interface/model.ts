import { Types } from "mongoose";
import { JwtPayload } from "jsonwebtoken";
export interface IProduct {
  title: string;
  price: string;
  categoryId: Types.ObjectId;
  description: string;
  image: string;
}
export interface CustomError extends Error {
  code?: string;
}

export interface IUser {
  username: string;
  email: string;
  password: string;
  fname: string;
  lname: string;
  phoneNumber: string;
  userType: string;
}

export interface ICategory {
  category: string;
}

export interface ICart {
  productName: string;
  unitPrice: string;
  quantity: string;
  owner?: string;
}

export interface AuthHeader extends JwtPayload {
  id: string;
  role: string;
}

export interface Inventory {
  productId: Types.ObjectId;
  costumerId: Types.ObjectId;
  quantity: string;
}