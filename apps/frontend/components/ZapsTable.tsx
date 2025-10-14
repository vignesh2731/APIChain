"use client"
import axios from "axios"
import Link from "next/link"
import { BACKEND_URL } from "./config"
import { useEffect, useState } from "react"

interface ZapType{
    actions:{
        type:{
            name:string
        }
    }[],
    id: string,
    name:string
    trigger:{
        type:{
            name:string
        }
    },
    createdOn:Date
}
export function ZapsTable(){
    const tableContents = [ "Name","Type", "Date","Actions"]
    const [zapData,setZapData] = useState<ZapType[]>();
    useEffect(()=>{
        async function main(){
            const temp = await axios.get(`${BACKEND_URL}/api/v1/zap`,{
                headers:{
                    Authorization:localStorage.getItem("token")
                }
            })
            setZapData(temp.data.zaps);
        }
        main();
    },[])
    
    return(
        <div className="flex flex-col w-full p-4">
            <div className="flex justify-between border-slate-300 border rounded-md h-16 items-center px-20">
                {tableContents.map((t,key)=>(
                    <div className="w-24 flex font-bold text-sm" key={key}>
                        {t}
                    </div>
                ))}
            </div>
            {zapData && zapData.map((d,key)=>(
                <Link href={`/zap/${d.id}`} key={key}>
                    <div className="flex justify-between border-slate-300 border rounded-md h-16 items-center px-20 hover:bg-slate-100 ">  
                        <div className="w-24">
                            {d.name}
                        </div>
                        <div className="w-24">
                            {d.trigger.type.name}
                        </div>
                        <div className="w-24">
                            {new Date(d.createdOn).toLocaleDateString()}
                        </div>
                        <div className="w-24">
                            {d.actions.length}
                        </div>
                    </div>
                </Link>
            ))}
            
        </div>
    )
}