import { Request, Response } from "express"
import UserModel from "../model/User";
import { handleFieldValidation, generateHash, generateToken, validateHashed, somethingWentWrong } from "../utils/global";

export const register = async (req: Request, res: Response) => {
    try{
        const fieldValidation = handleFieldValidation(req.body);
        if(!fieldValidation.length){
            const { email, firstName, lastName, password, phoneNumber } = req.body;
            const isUserExists = await UserModel.findOne({ email });
            const hashedPassword = await generateHash(password);
            const isPhoneNumberExists = await UserModel.findOne({ phoneNumber });

            if(isUserExists){
                return res.status(201).json({ msg: "Email already exists!", data: []})
            }

            if(isPhoneNumberExists){
                return res.status(201).json({ msg: "Phone number exists!", data: [] })
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

                res.cookie("accessToken", token, {
                    httpOnly: true,
                    // only works on localhost, if set to true, need to set env to production
                    secure: false,
                    // when set to lax, it means frontend and backend are same domain
                    sameSite: "none",
                    // set to 7 days
                    maxAge: 7 * 24 * 60 * 60 * 1000,
                })

                return res.status(200).json(
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
                    } 
                })
            }
        } else {
            return res.status(201).json({ msg: fieldValidation, data: [] })
        }
    }catch(error){
        console.error(error instanceof Error ? error.message : error)
        return res.status(500).json({ msg: somethingWentWrong, data: [] })
    }
}

export const login = async (req: Request, res: Response) => {
    try{
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });

        if(user && (await validateHashed(password, user.password))){
            const token = generateToken({user: { id: user._id, role: user.userType }});
            res.cookie("accessToken", token, {
                httpOnly: true,
                // only works on localhost, if set to true, need to set env to production
                secure: false,
                // when set to lax, it means frontend and backend are same domain
                sameSite: "none",
                // set to 7 days
                maxAge: 7 * 24 * 60 * 60 * 1000,
            })
            return res.status(200).json({
                msg: "login successfully!", 
                data: {
                    id: user._id,
                    fname: user.fname,
                    lname: user.lname,
                    email: user.email,
                    phoneNumber: user.phoneNumber,
                    userType: user.userType
                }
            })
        } else {
            return res.status(401).json({
                msg: "Invalid Credentials!",
                data: []
            })
        }
    }catch(error: unknown) {
        console.error(error instanceof Error ? error.message : error)
        return res.status(500).json({ msg: somethingWentWrong, data: [] })
    }
}
