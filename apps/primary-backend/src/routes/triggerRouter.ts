import { Router } from "express";
import db from '@repo/db/client'
export const triggerRouter = Router();

triggerRouter.get("/available",async(req,res)=>{
    const response = await db.availableTrigger.findMany({});
    const triggers = response;
    return res.json({triggers});
})