"use client"
import { Appbar } from "@/components/Appbar";
import { Primary } from "@/components/buttons/Primary";
import { ZapsTable } from "@/components/ZapsTable";
import { useRouter } from "next/navigation";

export default function(){
    const router = useRouter();
    return(
        <div>
            <Appbar/>
            <div className="flex flex-col gap-4 px-40 pt-10">
                <div className="flex justify-between pb-10">
                    <div className="text-3xl font-bold">
                        Zaps 
                    </div> 
                    <Primary label="Create" onClickAction={()=>{
                        router.push("/create-zap");
                    }} className="bg-purple-600 rounded-sm w-32 h-10 font-bold" />
                </div>
                <ZapsTable/>
            </div>
        </div>
    )
}