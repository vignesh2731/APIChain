import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from "../config";
export function authMiddleware(req:Request,res:Response,next:NextFunction){
    const token = req.headers.authorization as string;
    try{
        const payload = jwt.verify(token,JWT_SECRET);
        if(payload){
            // @ts-ignore
            req.id = payload.id;
            next();
        }
    }catch(err){
        res.status(403).json({
            msg: "Unauthorized user"
        })
    }
    
}