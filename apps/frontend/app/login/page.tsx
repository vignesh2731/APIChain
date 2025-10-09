"use client"
import { Appbar } from "@/components/Appbar";
import { AuthCard } from "@/components/AuthCard";
import { LoginComp } from "@/components/LoginComp";

export default function Login(){
    return(
        <div>
            <Appbar/>
            <div className="flex justify-center">
                <AuthCard/>
                <LoginComp/>
            </div>
        </div>
    )
}