import { Router } from "express";
import { authMiddleware } from "../middleware/middleware";
import { ZapcreateSchema } from "../types/zodTypes";
import db from '@repo/db/client'


export const zapRouter = Router();

zapRouter.get("/",authMiddleware,async(req,res)=>{
    //@ts-ignore
    const id = req.id;
    const zaps = await db.zap.findMany({
        where:{
            userId:id,
        },
        select:{
            id:true,
            name:true,
            createdOn:true,
            trigger:{
                select:{
                    type:{
                        select:{
                            name:true,
                        }
                    }
                }
            },
            actions:{
                select:{
                    type:{
                        select:{
                            name:true
                        }
                    }
                }
            }
        }
    })
    res.json({
        zaps
    })

})

zapRouter.post("/",authMiddleware,async(req,res)=>{
    const body = req.body;
    //@ts-ignore
    const id = req.id;
    const parsedData = ZapcreateSchema.safeParse(body);
    if(!parsedData.success){
        return res.json({
            msg: "Incorrect inputs"
        })
    }
    const zapId = await db.$transaction(async tx=>{
        const zap = await tx.zap.create({
            data:{
                userId:id,
                name: parsedData.data.name
            }
        })
        const triggerId = await tx.trigger.create({
            data:{
                zapId:zap.id,
                triggerId:parsedData.data.availableTriggerId
            }
        })
        parsedData.data.actions.map(async(a,index)=>{
            await db.action.create({
                data:{
                    zapId: zap.id,
                    sortingOrder: index,
                    actionId: a.availableActionId
                }
            })
        })
        return zap.id;
    })
    return res.json({
        zapId
    })

})

zapRouter.get("/:zapId",authMiddleware,async(req,res)=>{
    const { zapId } = req.params;
    // @ts-ignore
    const userId = req.id;
    const zap = await db.zap.findFirst({
        where:{
            id:zapId,
            userId:userId
        },
        include:{
            trigger:{
                select:{
                    type:{
                        select:{
                            name:true
                        }
                    }
                }
            },
            actions:{
                select:{
                    type:{
                        select:{
                            name:true
                        }
                    }
                }
            }
        }
    })
    res.json({zap}) ;
})

zapRouter.get("/triggers/getAvailableTriggers",async(req,res)=>{
    const response = await db.availableTrigger.findMany({});
    const triggers = response;
    return res.json({triggers}); 
})

zapRouter.get("/actions/getAvailableActions",async(req,res)=>{
    const response = await db.availableAction.findMany({});
    const actions = response;
    return res.json({actions});
})