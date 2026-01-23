import { Schema, model } from "mongoose";
import { IUser } from "../interface/model";

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
  },
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    required: true,
  },
})

const UserModel = model<IUser>("User", UserSchema);

export default UserModel;