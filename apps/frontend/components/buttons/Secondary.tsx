"use client"
export function Secondary({label,onClickAction,className} :{label:string,onClickAction:()=>void,className?:string}){
    return (
        <div className={`${className} text-slate-800 flex justify-center items-center rounded hover:bg-slate-100 cursor-pointer px-4`} onClick={onClickAction}>
            {label}
        </div>
    )
}