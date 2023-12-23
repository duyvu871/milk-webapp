"use client"

import {useEffect, useState} from "react";
import colors from "@/ultis/colors.ultis";
import {tw} from "@/ultis/tailwind.ultis";


//import icons
import { MdHistory } from "react-icons/md";

interface NextOrderDisplayProps {
    orderID: string;
    timeLeft: number;
}

const countDown = (time: number) => {
    const date = new Date(time);
    const now = new Date();
    const diff = date.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60)) - hours * 60;
    const seconds = Math.floor(diff / (1000)) - hours * 60 * 60 - minutes * 60;
    return `${hours}:${minutes}:${seconds}`;
}

const CountDownDisplay = ({ time }: { time: number }) => {

    const [countdown, setCountdown] = useState<number>(time);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown(prevCountdown => prevCountdown - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className={tw(
            "flex justify-center items-center",
        )}>
            <div className={"text-xs font-bold"}>
                {countDown(countdown)}
            </div>
        </div>
    )

}

export default function NextOrderDisplay({
    orderID, timeLeft
}: NextOrderDisplayProps) {

    const mainColor = `bg-[${colors.mainColor}]`;

    return (
        <div className={tw(
            "flex justify-center items-center p-4",
            `text-white font-bold text-xs`,
            "bg-[#103A49]",
        )}>
            <div className={""}>
                Đơn hàng tiếp theo {orderID}
            </div>
            <div className={"flex flex-row gap-1 ml-4 border-l border-white"}>
                <MdHistory size={24} color={"white"}/>
                <CountDownDisplay time={timeLeft}/>
            </div>
        </div>
    )
}