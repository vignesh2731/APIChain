import db from '@repo/db/client'
import { Kafka } from 'kafkajs'

const kafka = new Kafka({
    brokers:['localhost:9092'],
    clientId: 'outbox-processor'
})

const TOPIC_NAME = "zap-events"

async function main(){
    const consumer = kafka.consumer({groupId:'main-worker'});
    await consumer.connect();
    await consumer.subscribe({topic:TOPIC_NAME,fromBeginning:true});

    await consumer.run({
        autoCommit:false,
        eachMessage:async({partition,message,topic})=>{
            console.log({
                partition,
                offset:message.offset,
                value: message.value?.toString()
            })

            await new Promise(r=>setTimeout(r,5000));
            await consumer.commitOffsets([{topic:TOPIC_NAME,offset:(parseInt(message.offset)+1).toString(),partition:partition}])
        }
    })
}

main();