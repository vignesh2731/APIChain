"use client"

import { Appbar } from "@/components/Appbar";
import { Secondary } from "@/components/buttons/Secondary";
import { BACKEND_URL } from "@/components/config";
import { InputBox } from "@/components/InputBox";
import { ZapCellAction } from "@/components/ZapCellAction";
import { ZapCellTrigger } from "@/components/ZapCellTrigger";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface availableActionsType{
    id:string,
    name:string,
    metadata:string[]
}

interface actionsPlusMetadata extends Omit<availableActionsType,'name'|'metadata'>{
    metadata?:string
}

export interface availableTriggersType{
    id:string,
    name:string
}

export default function CreateZap(){
    const [availableActions,setAvailableActions] = useState<availableActionsType[]>();
    const [actionCount,setActionCount] = useState(1);
    const [zapName,setZapName] = useState("");
    const [actions,setActions] = useState<actionsPlusMetadata[]>();
    const [trigger,setTrigger] = useState(""); 
    const[availableTriggers,setAvailableTriggers] = useState<availableTriggersType[]>();
    const router = useRouter();
    useEffect(()=>{
        async function main(){
            const response = await axios.get(`${BACKEND_URL}/api/v1/action/available`);
            setAvailableActions(response.data.actions);
            const triggers = await axios.get(`${BACKEND_URL}/api/v1/trigger/available`);
            setAvailableTriggers(triggers.data.triggers);
        }
        main();
    },[])
    async function publish(){
        if(!zapName){
            alert("Give a name to your zap");
            return;
        }
        if(!trigger){
            alert("Select a trigger");
            return;
        }
        if(!actions || actions?.length==0){
            alert("There should be atleast one action for a trigger");
            return;
        }

        const response = await axios.post(`${BACKEND_URL}/api/v1/zap`,{
            name: zapName,
            availableTriggerId: trigger,
            actions: actions.map(a=>({availableActionId:a.id,actionMetadata:a.metadata}))
        },{
            headers:{
                Authorization:localStorage.getItem("token")
            }
        })
        router.push("/dashboard");
    }
    function callback(idx:number,id:string,metadata?:string){
        if(!id || id==='')return;
        const newActions = [...actions || []];
        if(!newActions || idx>=newActions?.length)newActions?.push({id,metadata});
        else newActions[idx] = {id,metadata};
        setActions(newActions);
        console.log(newActions);
    }
    function removeCallbackdata(){
        if(actions){
            actions.pop();
        }
    }
    return (
        <div>
            <Appbar/>
            <div className="flex justify-end pr-10 pt-10 items-center gap-4">
                <InputBox placeholder="Enter the name of your Zap" type="string" onChangeAction={(value)=>setZapName(value)} />
                <Secondary label="Publish" onClickAction={async()=>{
                    await publish();
                }} className="bg-black text-white hover:bg-slate-800 h-10 mt-2" />
            </div>
            <div className="flex flex-col items-center ">
                <ZapCellTrigger list={availableTriggers || []} callback={(value)=>{
                    setTrigger(value);
                }} />
                {Array.from({length:actionCount}).map((r,idx)=>(
                   <div key={idx}>
                        <ZapCellAction list={availableActions || []} idx ={idx} callback={(idx:number,id:string,metadata?:string)=>{
                            callback(idx,id,metadata);
                        }} />
                   </div>
                ))}
                <div className="flex gap-4 mt-4">
                    <div className="bg-amber-500 mb-10 flex justify-center items-center h-10 w-24 rounded-xl cursor-pointer " onClick={()=>{
                        setActionCount(c=>c+1);
                        }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}  stroke="currentColor" className="size-6 cursor-pointer">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </div>
                    <div className="bg-amber-500 flex justify-center items-center h-10 w-24 rounded-xl cursor-pointer " onClick={()=>{
                        removeCallbackdata();
                        setActionCount(c=>((c <= 0 ? 0: c-1)));
                        }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                        </svg>
                    </div>
                </div>
            </div>  
        </div>
    )
}