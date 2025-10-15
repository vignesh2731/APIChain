"use client"

import { useEffect, useState } from "react"
import { InputBox } from "./InputBox"

export function ZapCellAction({list,idx,callback}:{list:{name:string,id:string,metadata:string[]}[],callback:(idx:number,id:string,metadata:string)=>void,idx:number}){
    const [inputData,setInputData] = useState<string[] | null>(null);
    const [select,setSelect] = useState("");
    useEffect(()=>{
        let timeout = setTimeout(()=>{
            let index = 0;
            let obj = list.find(l=>l.id===select)?.metadata.reduce((ac,a)=>({...ac,[a]:(inputData)?inputData[index++]:''}),{})
            callback(idx,select,JSON.stringify(obj));
        },3000);
        return ()=>{
            clearTimeout(timeout);
        }
    },[inputData,select])
    return(
        <div className="flex flex-col items-center gap-4">
            <div className="bg-white rounded-xl shadow-md p-10 min-w-80  hover:shadow-lg mt-2">
                <div className="flex flex-col gap-5">
                    <div className="flex justify-center items-center h-full font-bold text-xl">
                        <div>
                            {"Action"}
                        </div>
                    </div>
                    <select className="border border-slate-300 h-8" 
                    defaultValue={"none"}
                     onChange={(e)=>{
                        setSelect(e.target.value);
                    }}>
                        <option value="none" disabled>Select an action</option>
                        {list && list.map((li,key)=>(
                            <option value={li.id} key={key}>{li.name}</option>
                        ))}
                    </select>
                    <div className="flex flex-col gap-4">
                        {select && list.find(l=>l.id===select)?.metadata.map((m,key)=>(
                            <div className="" key={key}>
                                <InputBox label={m} onChangeAction={(value)=>{
                                    let newData = [...inputData || []];
                                    newData[key] = value;
                                    setInputData(newData);
                                }} placeholder="" type="string" className="w-[250px] text-sm" />
                            </div>
                        ))}
                        
                    </div>
                </div>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path fillRule="evenodd" d="M12 2.25a.75.75 0 0 1 .75.75v16.19l2.47-2.47a.75.75 0 1 1 1.06 1.06l-3.75 3.75a.75.75 0 0 1-1.06 0l-3.75-3.75a.75.75 0 1 1 1.06-1.06l2.47 2.47V3a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
            </svg>
        </div>
    )
}