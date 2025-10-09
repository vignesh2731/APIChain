"use client"
export function Primary({label,onClickAction,className} :{label:string,onClickAction:()=>void,className?:string}){
    return (
        <div className={`${className} bg-amber-500 text-white flex justify-center items-center rounded-full cursor-pointer`} onClick={onClickAction}>
            {label}
        </div>
    )
}