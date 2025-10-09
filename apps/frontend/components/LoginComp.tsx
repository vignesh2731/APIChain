"use client"
import { useRouter } from "next/navigation";
import { Primary } from "./buttons/Primary";
import { InputBox } from "./InputBox";
import { useState } from "react";

export function LoginComp(){
    const router = useRouter();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    return(
        <div className="flex flex-col justify-center pl-10 pt-10">
            <div className="text-xl font-bold flex justify-center pb-10">
                {"Log in to your account"}
            </div>
            <div className="flex flex-col border border-slate-300 p-5 rounded-md gap-10">
                <InputBox label="Email " placeholder="Email" type="string" onChangeAction={(value)=>{
                    setEmail(value)
                }} />
                <InputBox label="Password " placeholder="Password" type="password" onChangeAction={(value)=>{
                    setPassword(value);
                }} />
                <Primary label="Login" onClickAction={()=>{}} className="font-bold w-80 h-10" />
                <div className="flex justify-center">
                {"Don't have a Zapier account yet? "}&nbsp;
                <div className="text-blue-400 underline cursor-pointer" onClick={()=>{
                    router.push("/signup")
                }}> Sign Up</div>
            </div>
            </div>
    
        </div>
    )
}