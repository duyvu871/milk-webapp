"use client"

import TrendingHead from "@/components/Trending/TrendingHead";
import NextOrderBanner from "@/components/NextOrderPanel/NextOrderBanner";
import TrendingTable from "@/components/Trending/TrendingTable";
import MenuBar from "@/components/MenuBar";
import {useRouter} from "next/navigation";
import {useEffect, useLayoutEffect, useRef, useState} from "react";
import fakeResponseData from "@/fakeData/fakeResponseData";
import AppConfig from "@/configs/App.config";


interface ITableItem {
    orderID: string;
    // timeLeft: number;
    result: number;
}


const TrendingDisplay = () => {

    const { push } = useRouter();

    const [data, setData] = useState<ITableItem[]>([]);
    const initial = useRef(false);

    useEffect(() => {
        if (!initial.current) {
            initial.current = true;
            return;
        } else {
            const access_token =  localStorage.getItem("access_token")
            // console.log(access_token)
            if(!access_token){
                return push("/");
            } else {
                const getOrderList = async () => {
                    console.log(access_token)
                    const response = await fetch(`${AppConfig.mainApiUrl}/order/get-order-list`, {
                        method: "GET",
                        // body: new URLSearchParams(),
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded",
                            "x-access-token": access_token || ""
                        },
                    }).then(res => res.json())
                        .then((data) => {
                            console.log(data);
                            setData(data);
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                    // setData(fakeResponseData.orderList.map((item) => ({orderID: String(item.orderID), result: Number(item.result)})));
                }

                getOrderList();
            }
        }
    }, []);


    return (
        <>
            <div className={"mx-[1px] mt-[1px] w-full"}>
                <TrendingHead/>
                <NextOrderBanner className={"bg-[#68878E]"}/>
            </div>
            <div className={"mx-[1px] mt-[1px]  mb-[150px] w-full"}>
                <TrendingTable data={data}/>
            </div>
            <MenuBar userData={{
                username: "Nguyễn Văn A",
                phone: "0123456789",
                email: ""

            }}/>
        </>
    )
}

export default TrendingDisplay;