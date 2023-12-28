import NextOrderDisplay from "@/components/NextOrderPanel/NextOrderDisplay";
import NextOrderResult from "@/components/NextOrderPanel/NextOrderResult";
import NextOrderBanner from "@/components/NextOrderPanel/NextOrderBanner";
import React from "react";
interface NextOrderPanelProps {
    orderID: string;
    timeLeft: number;
    stateControl?: Record<string, {
        state: boolean;
        setState: React.Dispatch<React.SetStateAction<boolean>>;
    }>;
}

export default function NextOrderPanel({
    orderID, timeLeft, stateControl
}: NextOrderPanelProps) {
    return (
        <div className={"mx-1 mt-1 mb-3 w-full"}>
            <NextOrderDisplay orderID={orderID} timeLeft={1702399249793 + 360000000}/>
            <NextOrderResult orderID={orderID} timeLeft={1702399249793 + 360000000} result={62570} stateControl={{showPopup: stateControl!.showPopup}}/>
            <NextOrderBanner />
        </div>
    )
}