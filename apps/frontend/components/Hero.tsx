"use client"
import { useRouter } from "next/navigation";
import { Primary } from "./buttons/Primary";
import { Secondary } from "./buttons/Secondary";

export function Hero(){
    const router = useRouter();
    return(
        <div className="flex flex-col items-center gap-10 pt-10">
            <div className="text-5xl font-bold">
                Automate as fast as you can type
            </div>
            <div className="text-slate-600 font-medium max-w-[700px]">
                AI gives you automation superpowers, and Zapier puts them to work . Pairing AI ans Zapier helps you turn ideas into workflows and bots that work for you
            </div>
            <div className="flex gap-10">
                <Primary label="Get started free" onClickAction={()=>{
                    router.push("/signup")
                }} className="h-10 w-40 font-semibold" />
                <Secondary label="Contact Sales" onClickAction={()=>{}} className="h-10 w-40 border rounded-2xl font-semibold" />
            </div>
            <div>
                <video src="https://res.cloudinary.com/zapier-media/video/upload/q_auto/f_auto/c_scale,w_1920/v1745866077/250421_Zapier_Enterprise_Hero_v01_qessny.mp4" muted autoPlay className="w-[900px] pb-10"></video>
            </div>
        </div>
    )
}