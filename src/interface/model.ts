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
  productId: Types.ObjectId;
  unitPrice: number;
  quantity: number;
  ownerId: Types.ObjectId;
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

export interface AuthErrorCode {
  TOKEN_EXPIRED: string,
  INVALID_TOKEN: string,
  UNAUTHORIZED: string,
  SOMETHING_WENT_WRONG: string,
  PHONE_NUMBER_EXISTS: string,
  USER_EXISTS: string,
}

export const AuthErrorCode: AuthErrorCode = {
  TOKEN_EXPIRED: "Token expired, please login again!",
  INVALID_TOKEN: "Authentication failed, please login again!",
  UNAUTHORIZED: "Unauthorized, Invalid request!",
  SOMETHING_WENT_WRONG: "Something went wrong, please try again later!",
  PHONE_NUMBER_EXISTS: "Phone number already exists!",
  USER_EXISTS: "User already exists!"
}