import ResultDisplay from "./NextOrderResultDisplay";

// import icons
import { FaCircleInfo } from "react-icons/fa6";
import React from "react";
import {tw} from "@/ultis/tailwind.ultis";

interface NextOrderResultProps {
    orderID: string;
    timeLeft: number
    result: number | string;
    stateControl?: Record<string, {
        state: boolean;
        setState: React.Dispatch<React.SetStateAction<boolean>>;
    }>;
}


export default function NextOrderResult({
    orderID, timeLeft, result, stateControl
}: NextOrderResultProps) {
    const digits = String(result).split("");

    return (
        <div className={"flex flex-col bg-[#68878E] pb-3"}>
            <div className={"flex flex-row justify-between items-center w-full border-white border-b-2 p-2 mb-4"}>
                <div className={"text-xs font-bold text-white"}>
                    HANAMMILK
                </div>
                <div className={"text-sm text-white"}>
                    Kết quả đơn hàng {orderID} hôm nay:
                </div>
                <div className={" cursor-pointer"} onClick={() => {
                    if (stateControl) {
                        stateControl["showPopup"].setState(true);
                    }
                }}>
                    <FaCircleInfo className={"text-[#103A49] text-lg bg-white rounded-full"} width={12} height={12}/>
                </div>
            </div>

            <div className={"flex flex-row justify-center items-center gap-3"}>
                {
                    digits.map((digit, index) => (
                        <div
                            className={"px-2 bg-white border-solid border-[#113b49] border-[1px] font-semibold text-black text-xl"}
                            key={"digits-" + index}>
                            {digit}
                        </div>
                    ))
                }
        </div>
</div>
)
}