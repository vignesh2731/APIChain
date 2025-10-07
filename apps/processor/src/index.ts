import db from '@repo/db/client'
import { Kafka } from 'kafkajs'

const kafka = new Kafka({
    brokers:['localhost:9092'],
    clientId: 'outbox-processor'
})

const TOPIC_NAME = 'zap-events';

async function main(){
    const producer = kafka.producer();
    await producer.connect();
    while(1){
        const pendingRows = await db.zapRunOutbox.findMany({
            where:{},
            take:10
        })
        
        await producer.send({
            topic:TOPIC_NAME,
            messages:pendingRows.map(r=>({value: r.zapRunId}))
        })

        await db.zapRunOutbox.deleteMany({
            where:{
                id:{
                    in:pendingRows.map(x=>x.id)
                }
            }
        })
    }
}

main();