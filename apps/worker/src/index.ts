import db from '@repo/db/client'
import { Kafka } from 'kafkajs'
import { parse } from './parser';
import { Email } from './email';
import { Solana } from './solana';

const kafka = new Kafka({
    brokers:['localhost:9092'],
    clientId: 'outbox-processor'
})

const TOPIC_NAME = "zap-events"

async function main(){
    const consumer = kafka.consumer({groupId:'main-worker'});
    const producer = kafka.producer();
    await consumer.connect();
    await consumer.subscribe({topic:TOPIC_NAME,fromBeginning:true});
    await producer.connect();
    await consumer.run({
        autoCommit:false,
        eachMessage:async({partition,message,topic})=>{
            // console.log({
            //     partition,
            //     offset:message.offset,
            //     value: message.value?.toString(),
            // })
            
            const data = JSON.parse(message?.value?.toString() || "");
            const zapDetails = await db.zapRun.findFirst({
                where:{
                    id: String(data.id),
                },
                include:{
                    zap:{
                        include:{
                            actions:{
                                include:{
                                    type:{
                                        select:{
                                            name:true
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            })
            const metadata = zapDetails?.metadata;
            const totalActionsLength = (zapDetails?.zap.actions?.length || 0)-1;
            const requiredAction = zapDetails?.zap.actions.find(f=>f.sortingOrder===data.state);
            const actionMetadata = requiredAction?.metadata;
            if(requiredAction?.type.name==='Send email'){
                //@ts-ignore
                const finalData = parse(actionMetadata?.body,metadata)
                //@ts-ignore
                const finalEmail = parse(actionMetadata?.to,metadata);
                await Email(finalEmail,finalData);   
                console.log("Email sent");          
            }
            if(requiredAction?.type.name==='Send Solana'){
                //@ts-ignore
                const finalAmount = parse(actionMetadata?.amount,metadata)
                //@ts-ignore
                const finalKey = parse(actionMetadata?.privateKey,metadata);
                await Solana(finalAmount,finalKey);
            }
            if(data.state<totalActionsLength){
                await producer.send({
                    topic:TOPIC_NAME,
                    messages:[{value:JSON.stringify({id:data.id,state:data.state+1})}]
                })
            }        
            await consumer.commitOffsets([{topic:TOPIC_NAME,offset:(parseInt(message.offset)+1).toString(),partition:partition}])
        }
    })
}

main();