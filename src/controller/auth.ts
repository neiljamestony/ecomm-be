import { Request, Response } from "express"
import UserModel from "../model/User";
import { AuthErrorCode } from "../interface/model";
import { handleFieldValidation, generateHash, generateToken, validateHashed } from "../utils/global";

export const register = async (req: Request, res: Response) => {
    try{
        const fieldValidation = handleFieldValidation(req.body);

        if(!fieldValidation.length){
            const { email, firstName, lastName, password, phoneNumber } = req.body;
            const isUserExists = await UserModel.findOne({ email });
            const hashedPassword = await generateHash(password);
            const isPhoneNumberExists = await UserModel.findOne({ phoneNumber });

            if(isUserExists){
                return res.json({ msg: AuthErrorCode.USER_EXISTS, data: [], status: 400 })
            }

            if(isPhoneNumberExists){
                return res.json({ msg: AuthErrorCode.PHONE_NUMBER_EXISTS, data: [], status: 400 })
            }

            const user = await UserModel.create({
                fname: firstName,
                lname: lastName,
                email: email,
                phoneNumber: phoneNumber,
                userType: "user",
                password: hashedPassword
            });

            if(user){
                const token = generateToken({user: { id: user._id, role: user.userType }});
                return res.json(
                { 
                    msg: "User Registration Succeeded!", 
                    data: {
                        id: user._id,
                        fname: user.fname,
                        lname: user.lname,
                        email: user.email,
                        phoneNumber: user.phoneNumber,
                        userType: user.userType,
                        token
                    },
                    status: 200
                })
            } else {
                return res.json({ msg: AuthErrorCode.SOMETHING_WENT_WRONG, data: [], status: 500 })
            }
        } else {
            return res.json({ msg: fieldValidation, data: [], status: 400 })
        }
    }catch(error){
        console.error(error instanceof Error ? error.message : error)
        return res.json({ msg: AuthErrorCode.SOMETHING_WENT_WRONG, data: [], status: 500 })
    }
}

export const login = async (req: Request, res: Response) => {
    try{
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        console.log(email, password);

        if(user && (await validateHashed(password, user.password))){
            const token = generateToken({user: { id: user._id, role: user.userType }});
            return res.json({
                msg: "login successfully!", 
                data: {
                    id: user._id,
                    fname: user.fname,
                    lname: user.lname,
                    email: user.email,
                    phoneNumber: user.phoneNumber,
                    userType: user.userType,
                    token
                },
                status: 200
            })
        } else {
            return res.json({
                msg: "Invalid Credentials!",
                data: [],
                status: 401
            })
        }
    }catch(error: unknown) {
        console.error(error instanceof Error ? error.message : error)
        return res.json({ msg: AuthErrorCode.SOMETHING_WENT_WRONG, data: [], status: 500 })
    }
}
