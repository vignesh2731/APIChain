"use client"
import { useRouter } from "next/navigation";
import { Primary } from "./buttons/Primary";
import { Secondary } from "./buttons/Secondary";

export function Appbar(){
    const router = useRouter();
    return (
        <div className="flex flex-col justify-center px-10 border-b border-slate-300 h-20">
            <div className="flex justify-between">
                <div className="text-3xl font-extrabold cursor-pointer" onClick={()=>{
                    router.push("/")
                }}>
                    Zapier 
                </div>
                <div className="flex gap-10">
                    <Secondary label="Contact Sales" onClickAction={()=>{}}className = "text-sm"/>
                    <Secondary label="Login" onClickAction={()=>{
                        router.push("/login")
                    }} className="text-sm" />
                    <Primary label="Signup" onClickAction={()=>{
                        router.push("/signup")
                    }} className="w-24 h-8 font-semibold text-sm hover:shadow-md"/>                                          
                </div>
            </div>
        </div>
    )
}