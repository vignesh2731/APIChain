import { Router } from "express";
import { authMiddleware } from "../middleware/middleware";
import { SigninSchema, SignupSchema } from "../types/zodTypes";
import db from '@repo/db/client'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from "../config";

export const userRouter = Router();

userRouter.post("/signup",async(req,res)=>{
    const body = req.body;
    const parsedData = SignupSchema.safeParse(body);
    if(!parsedData.success){
        return res.json({
            msg:"Incorrect inputs"
        })
    }

    const userExisting = await db.user.findFirst({
        where:{
            email:parsedData.data.username
        }
    })

    if(userExisting){
        return res.json({
            msg: `User with ${parsedData.data.username} already exists`
        })
    }

    const data = await db.user.create({
        data:{
            email: parsedData.data.username,
            password: parsedData.data.password,
            name: parsedData.data.name
        }
    })

    const token = jwt.sign({id:data.id},JWT_SECRET);
    
    res.json({
        msg: "User signed in",
        token
    })
})

userRouter.post("/signin",async(req,res)=>{
    const body = req.body;
    const parsedData = SigninSchema.safeParse(body);
    if(!parsedData.success){
        return res.json({
            msg:"Incorrect inputs"
        })
    }
    const user = await db.user.findFirst({
        where:{
            email: parsedData.data.username,
            password: parsedData.data.password
        }
    })
    
    if(!user){
        return res.status(403).json({
            msg: "Incorrect creds"
        })
    }

    const token = jwt.sign({id:user.id},JWT_SECRET);

    res.json({
        token
    })
})

userRouter.get("/",authMiddleware,async(req,res)=>{
    // @ts-ignore
    const id = req.id;
    const user = await db.user.findFirst({
        where:{
            id
        },
        select:{
            email: true,
            name: true
        }
    })

    return res.json({
        user
    })
})