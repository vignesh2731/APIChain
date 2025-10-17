import express from 'express'
import db from '@repo/db/client'
const app = express();
app.use(express.json());

app.post("/hooks/catch/:userId/:zapId",async(req,res)=>{
    const { userId, zapId} = req.params;
    const body = req.body
    await db.$transaction(async(tx)=>{
        const response = await tx.zapRun.create({
            data:{
                zapId:zapId,
                metadata:body
            }
        })
        await tx.zapRunOutbox.create({
            data:{
            zapRunId:response.id
            }
        })
    })
    console.log("Stored inside db done");
    res.json({
        msg:"Query executed"
    })
})

app.listen(3002,()=>{
    console.log("Listening to port 3002")
})