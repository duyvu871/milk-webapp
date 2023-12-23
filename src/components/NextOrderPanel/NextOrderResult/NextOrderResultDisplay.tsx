const ResultDisplay = ({ result }: { result: number[] | string[] }) => {
     return (
         <div className={"flex flex-row justify-center items-center gap-4 w-full"}>
             {
                 result.map((digit, index) => (
                     <div className={"px-2 bg-white border-solid border-black border-[1px] font-bold"} key={"digits-" + index}>
                         {digit}
                     </div>
                 ))
             }
         </div>
     )
 }

export default ResultDisplay;