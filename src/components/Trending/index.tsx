"use client"
import TrendingHead from "@/components/Trending/TrendingHead";
import NextOrderBanner from "@/components/NextOrderPanel/NextOrderBanner";
import TrendingTable from "@/components/Trending/TrendingTable";
import MenuBar from "@/components/MenuBar";
import {useRouter} from "next/navigation";
import {useEffect, useLayoutEffect, useRef, useState} from "react";
import fakeResponseData from "@/fakeData/fakeResponseData";
import AppConfig from "@/configs/App.config";
import { extractProperties } from "@/helper/extractProperties";

interface ITableItem {
    orderID: string;
    // timeLeft: number;
    result: number;
}


const TrendingPage = () => {
    const { push } = useRouter();
    const [data, setData] = useState<ITableItem[]>([]);

    useEffect(() => {
        const extraData = fakeResponseData.orderList.map(order => extractProperties(order, ["orderID", "result"]));
        setData(extraData as unknown as ITableItem[]);
    }, []);


    return (
        <div className={"flex flex-col justify-center items-center"}>
            <div className={"mx-[1px] mt-[1px] w-full"}>
                <TrendingHead/>
                <NextOrderBanner className={"bg-[#68878E]"}/>
            </div>
            <div className={"mx-[1px] mt-[1px]  mb-[150px] w-full"}>
                <TrendingTable data={data}/>
            </div>
            {/*<MenuBar />*/}
        </div>
    )
}

export default TrendingPage;