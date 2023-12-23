import {tw} from "@/ultis/tailwind.ultis";
import {MdHistory} from "react-icons/md";

export default function TrendingHead() {
    return (
        <div className={tw(
            "flex justify-center items-center p-2 w-full",
            `text-white font-semibold text-md`,
            "bg-[#103A49]",
        )}>
            <div className={""}>
               Xu hướng kỉ lục
            </div>
        </div>
    )
}