import React, {useLayoutEffect} from "react";
import AppConfig from "@/configs/App.config";


export default function useOrder() {
    const [orderData, setOrderData] = React.useState<any>(null);
    const [orderTimeLeft, setOrderTimeLeft] = React.useState<any>(null);

    const update: Record<any, any> = {};

    const getOrderTimeLeft = async function (): Promise<{
        _id: string;
        timeStart: string;
        timeEnd: string;
        __v: number;
        updatedAt: string;
    }> {
        const response = await fetch(`${AppConfig.mainApiUrl}/order/get-collection-time`);
        return await response.json();
    }

    useLayoutEffect(() => {
        getOrderTimeLeft().then((data) => {
            setOrderTimeLeft(Number(data.timeEnd));
        });
    }, []);

    return {orderData, orderTimeLeft};
}