export function ZapCellTrigger(){
    return(
        <div className="flex flex-col items-center gap-6">
            <div className="bg-white rounded-xl shadow-md p-3 w-72 h-24 hover:shadow-lg">
                <div className="flex justify-center items-center h-full font-bold text-xl">
                    <div>
                        {"Web-hook"}
                    </div>
                </div>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path fillRule="evenodd" d="M12 2.25a.75.75 0 0 1 .75.75v16.19l2.47-2.47a.75.75 0 1 1 1.06 1.06l-3.75 3.75a.75.75 0 0 1-1.06 0l-3.75-3.75a.75.75 0 1 1 1.06-1.06l2.47 2.47V3a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
            </svg>
        </div>
    )
}