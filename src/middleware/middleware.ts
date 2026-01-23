import { Request, Response, NextFunction } from "express";
import { unauthorizedRequest, somethingWentWrong } from "../utils/global";
import { env } from "../utils/env";
import { AuthHeader } from "../interface/model";
import jwt, { JsonWebTokenError, TokenExpiredError, NotBeforeError } from "jsonwebtoken";

export const checkIfAuthorized = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization ?? "";

    if(!authHeader || !authHeader.startsWith("Bearer ")){
        res.status(401).json({msg: unauthorizedRequest, data: [] })
    }

    const token = authHeader.split(' ')[1];
    jwt.verify(token, env.authSecret, (error, decoded) => {
        if(error){
            if(error instanceof JsonWebTokenError){
                if(error instanceof TokenExpiredError){
                    console.log(error.message) // token expired
                    return res.status(401).json({ msg: unauthorizedRequest, data: [] })
                }
                if(error instanceof NotBeforeError){
                    console.log(error.message) // token is not active to use yet
                    return res.status(401).json({ msg: unauthorizedRequest, data: [] })
                }
                console.log(error.message) // token malformed
                return res.status(401).json({ msg: unauthorizedRequest, data: [] })
            }
            return res.status(401).json({ msg: somethingWentWrong + error, data: [] })
        }
        req.user = decoded as AuthHeader;
        next();
    });
}