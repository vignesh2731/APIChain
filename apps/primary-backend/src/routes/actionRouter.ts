import { Router } from "express";
import db from '@repo/db/client'
export const actionRouter = Router();

actionRouter.get("/available",async(req,res)=>{
    const response = await db.availableAction.findMany({});
    const actions = response;
    return res.json({actions});
})