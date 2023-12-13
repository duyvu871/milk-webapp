

// import icons
import { IoIosInformationCircleOutline } from "react-icons/io";


interface NextOrderResultProps {
    orderID: string;
    timeLeft: number
    result: number | string;
}



export default function NextOrderResult({
    orderID, timeLeft, result
}: NextOrderResultProps) {
    const digits = String(result).split("");

    return (
        <div className={"flex flex-col bg-[#68878E] p-2"}>
            <div className={"flex flex-row justify-between items-center w-full border-white border-b-2 p-2 mb-4"}>
                <div className={"text-md font-bold text-white"}>
                    AFamily
                </div>
                <div className={"text-xs font-bold text-white"}>
                    Kết quả đơn hàng {orderID} hôm nay:
                </div>
                <div className={""}>
                    <IoIosInformationCircleOutline className={"text-white text-lg"} width={12} height={12}/>
                </div>
            </div>
            <div className={"flex flex-row justify-center items-center gap-4 w-full"}>
                {
                    digits.map((digit, index) => (
                        <div className={"px-2 bg-white border-black border-1 font-bold"} key={"digits-" + index}>
                            {digit}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}