import { Request, Response, NextFunction } from "express";
import { env } from "../utils/env";
import { AuthHeader, AuthErrorCode } from "../interface/model";
import jwt, { JsonWebTokenError, TokenExpiredError, NotBeforeError } from "jsonwebtoken";

export const checkIfAuthorized = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization ?? "";
    
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        res.status(401).json({ msg: AuthErrorCode.UNAUTHORIZED, data: [] })
    }

    const token = authHeader.split(' ')[1];
    jwt.verify(token, env.authSecret, (error, decoded) => {
        if(error){
            if(error instanceof JsonWebTokenError){
                if(error instanceof TokenExpiredError){
                    console.log(error.message) // Token Expired
                    return res.json({ msg: AuthErrorCode.TOKEN_EXPIRED, data: [], status: 401 })
                }
                if(error instanceof NotBeforeError){
                    console.log(error.message) // Token is not valid to use
                    return res.json({ msg: AuthErrorCode.UNAUTHORIZED, data: [], status: 401 })
                }
                console.log(error.message) // Token malformed
                return res.json({ msg: AuthErrorCode.INVALID_TOKEN, data: [], status: 401 })
            }else{
                return res.json({ msg: `${AuthErrorCode.SOMETHING_WENT_WRONG} ${error}`, data: [], status: 401 })
            }
        }else{
            req.user = decoded as AuthHeader;
            next();
        }
    });
}