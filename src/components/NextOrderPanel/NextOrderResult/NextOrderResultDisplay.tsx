import {tw} from "@/ultis/tailwind.ultis";

const ResultDisplay = ({ result }: { result: number[] | string[] }) => {
     return (
         <div className={"flex flex-row justify-between items-center w-full h-full"}>
             {
                 result.map((digit, index) => (
                     <div className={tw("w-full h-full flex justify-center items-center border-gray-400 border-0 border-r-[1px]", (index === result.length -1 ) ?  "border-r-0" : "")} key={"digits-" + index}>
                         <span className={"px-2 bg-white border-solid border-[#113b49] border-[1px] font-semibold text-black text-xl"}>{digit}</span>
                     </div>
                 ))
             }
         </div>
     )
 }

export default ResultDisplay;