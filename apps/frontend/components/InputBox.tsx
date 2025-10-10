"use client"
export function InputBox({placeholder,type,label,onChangeAction,className}:{className?:string,placeholder:string,type:string,label?:string,onChangeAction:(value:string)=>void}){
    return(
        <div className="flex flex-col gap-3">
            <div className="text-sm font-semibold ">
                {label}
            </div>
            <input placeholder={placeholder} type={type} onChange={(e)=>{
                onChangeAction(e.target.value)
            }} className={`${className} w-80 h-10 p-4 border`}/>
        </div>
    )
}