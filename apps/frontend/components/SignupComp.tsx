"use client"
import { useRouter } from "next/navigation";
import { Primary } from "./buttons/Primary";
import { InputBox } from "./InputBox";
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "./config";

export function SignupComp(){
    const router = useRouter();
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    return(
        <div className="flex flex-col justify-center pl-10 pt-10">
            <div className="text-xl font-bold flex justify-center pb-6">
                {"Create a new account"}
            </div>
                <div className="flex flex-col border border-slate-300 p-5 rounded-md gap-10">
                    <InputBox label="Name " placeholder="Name" type="string" onChangeAction={(value)=>{
                        setName(value)
                    }} />
                    <InputBox label="Email " placeholder="Email" type="string" onChangeAction={(value)=>{
                        setEmail(value)
                    }} />
                    <InputBox label="Password " placeholder="Password" type="password" onChangeAction={(value)=>{
                        setPassword(value);
                    }} />
                    <Primary label="Signup" onClickAction={async()=>{
                        const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`,{
                            username:email,
                            password,
                            name
                        });
                        const token = response.data.token;
                        if(token){
                            localStorage.setItem("token",token);
                            router.push("/dashboard");
                        }
                        else{
                            alert("Username already exists")
                        }
                    }} className="font-bold w-80 h-10" />
                    <div className="flex justify-center">
                    {"Already have an account? "}&nbsp;
                    <div className="text-blue-400 underline cursor-pointer" onClick={()=>{
                        router.push("/login")
                    }}> Login</div>
                </div>  
            </div>
    
        </div>
    )
}