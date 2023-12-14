import NextOrderDisplay from "@/components/NextOrderPanel/NextOrderDisplay";
import NextOrderResult from "@/components/NextOrderPanel/NextOrderResult";
import NextOrderBanner from "@/components/NextOrderPanel/NextOrderBanner";
interface NextOrderPanelProps {
    orderID: string;
    timeLeft: number;
}

export default function NextOrderPanel({
    orderID, timeLeft
}: NextOrderPanelProps) {
    return (
        <div className={"mx-1 mt-1 mb-3 w-full"}>
            <NextOrderDisplay orderID={orderID} timeLeft={1702399249793 + 360000000}/>
            <NextOrderResult orderID={orderID} timeLeft={1702399249793 + 360000000} result={62570}/>
            <NextOrderBanner orderID={orderID} timeLeft={1702399249793 + 360000000} result={62570}/>
        </div>
    )
}