"use client"
import { useRouter } from "next/navigation";
import { Primary } from "./buttons/Primary";
import { Secondary } from "./buttons/Secondary";
import { useEffect, useState } from "react";

export function Appbar(){
    const [mount,setMount] = useState(false);
    const [token,setToken] = useState<string|null>();
    useEffect(()=>{
        setMount(true);
        setToken(localStorage.getItem("token"));
    },[])
    const router = useRouter();
    
    if(!mount){
        return <div>

        </div>
    }
    return (
        <div className="flex flex-col justify-center px-10 border-b border-slate-300 h-20">
            <div className="flex justify-between">
                <div className="text-3xl font-extrabold cursor-pointer" onClick={()=>{
                    router.push("/")
                }}>
                    Zapier 
                </div>
                {!token && <div className="flex gap-10">
                    <Secondary label="Contact Sales" onClickAction={()=>{}}className = "text-sm"/>
                    {<Secondary label="Login" onClickAction={()=>{
                        router.push("/login")
                    }} className="text-sm" />}
                    <Primary label="Signup" onClickAction={()=>{
                        router.push("/signup")
                    }} className="w-24 h-8 font-semibold text-sm hover:shadow-md"/>                                          
                </div>}
                {token && <div>
                    <Secondary label="Logout" className="border border-slate-200 p-2 rounded-2xl font-semibold bg-white " onClickAction={()=>{
                        localStorage.removeItem("token");
                        setToken(null);
                        router.push("/");
                    }}/>
                    </div>}
            </div>
        </div>
    )
}