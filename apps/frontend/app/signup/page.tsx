"use client"
import { Appbar } from "@/components/Appbar";
import { AuthCard } from "@/components/AuthCard";
import { SignupComp } from "@/components/SignupComp";

export default function Signup(){
    return(
        <div>
            <Appbar/>
            <div className="flex justify-center">
                <AuthCard/>
                <SignupComp/>
            </div>
        </div>
    )
}