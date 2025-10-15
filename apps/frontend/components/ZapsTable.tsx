"use client"
import axios from "axios"
import Link from "next/link"
import { BACKEND_URL, HOOK_URL } from "./config"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface ZapType{
    actions:{
        type:{
            name:string;
            image:string;
        }
    }[],
    id: string,
    name:string,
    userId: number,
    trigger:{
        type:{
            name:string,
            image:string;
        }
    },
    createdOn:Date
}
export function ZapsTable(){
    const tableContents = [ "Name","Type","Hook-Url", "Date","Actions"]
    const router = useRouter();
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
            <div className="flex justify-between border-slate-300 border rounded-md h-16 items-center px-10">
                {tableContents.map((t,key)=>(
                    <div className="justify-between flex font-bold text-sm min-w-60 " key={key}>
                        {t}
                    </div>
                ))}
            </div>
            {zapData && zapData.map((d,key)=>(
                <div className="flex border-slate-300 border rounded-md h-16 items-center px-10 hover:bg-slate-100" key={key} onClick={()=>{
                    router.push(`/zap/${d.id}`)
                }}>  
                    <div className="min-w-60 ">
                        {d?.name}
                    </div>
                    <div className="min-w-60 ">
                        <img src={d.trigger?.type.image} alt="" className="h-10 rounded-full -ml-3" />
                    </div>
                    <div className="min-w-60 truncate hover:text-slate-700 pr-10">
                        <Link href={`${HOOK_URL}/${d.userId}/${d.id}`} target="_blank" rel="noopener noreferrer"><p className="overflow-scroll">{`${HOOK_URL}/${d.userId}/${d.id}`}</p></Link>
                    </div>
                    <div className="min-w-60 ">
                        {new Date(d.createdOn).toLocaleDateString()}
                    </div>
                    <div className="min-w-60 flex gap-2 ">
                        {d.actions.map((dr,k1)=>(
                            <img src={dr.type.image} alt="" className="h-10 rounded-full" key={k1} />
                        ))}
                    </div>
                </div>
            ))}
            
        </div>
    )
}