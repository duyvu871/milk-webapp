"use client"

import TrendingHead from "@/components/Trending/TrendingHead";
import TrendingTable from "@/components/Trending/TrendingTable";
import NextOrderBanner from "@/components/NextOrderPanel/NextOrderBanner";
import MenuBar from "@/components/MenuBar";

import {useEffect, useLayoutEffect, useRef, useState} from "react";
import AppConfig from "@/configs/App.config";
import {useRouter} from "next/navigation";
import fakeResponseData from "@/fakeData/fakeResponseData";


interface ITableItem {
    orderID: string;
    // timeLeft: number;
    result: number;
}

export default function Page() {
    const { push } = useRouter();

    const [data, setData] = useState<ITableItem[]>([]);
    const initial = useRef(false);

    useLayoutEffect(() => {
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
                    // await fetch(`${'http://localhost:3002'}/order/get-order-list`, {
                    //     method: "GET",
                    //     headers: {
                    //         "x-access-token": access_token,
                    //         "Content-Type": "application/x-www-form-urlencoded",
                    //     },
                    // })
                    //     .then((response) => {
                    //         return response.json();
                    //     })
                    //     .then((data) => {
                    //         console.log(data);
                    //         setData(data);
                    //     })
                    //     .catch((error) => {
                    //         console.log(error);
                    //     });
                    setData(fakeResponseData.orderList.map((item) => ({orderID: String(item.orderID), result: Number(item.result)})));
                }

                getOrderList();
            }
        }
    }, []);

    return (
        <div className={"flex flex-col justify-center items-center w-full"}>
            <div className={"mx-[1px] mt-[1px] w-full"}>
                <TrendingHead />
                <NextOrderBanner className={"bg-[#68878E]"} />
            </div>
            <div className={"mx-[1px] mt-[1px]  mb-[150px] w-full"}>
                <TrendingTable data={data}/>
            </div>
            <MenuBar userData={{
                username: "Nguyễn Văn A",
                phone: "0123456789",
                email: ""

            }}/>
        </div>
    )
}