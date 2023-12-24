"use client"

import NextOrderPanel from '@/components/NextOrderPanel'
import InlineTag from "@/components/Tag/Inline";
import NextOrderProduct from "@/components/NextOrderPanel/NextOrderProduct";
import MenuBar from "@/components/MenuBar";
import SpinningWheel from "@/components/SpinningWheel";
import ThreeDotsWave from "@/components/Loading/ThreeDotsWave";

import FakeResponseData from "@/fakeData/fakeResponseData";
import React, {useEffect, useLayoutEffect, useRef} from "react";
import AppConfig from "@/configs/App.config";
import { useRouter } from 'next/navigation';



const ProductView = ({productKeys}: {productKeys: string[]}) => {
    return (
        <div className={"flex flex-row flex-1 justify-around items-start gap-2 w-full my-4"}>
            {
                productKeys.map((productKey, index) => {
                    // console.log("productKey: ", index);
                    if (index%2 === 0) {
                        // console.log("productKey: ", index)
                        return (
                            <NextOrderProduct
                                key={"products-" + index}
                                orderID={"5232"}
                                products={
                                    [
                                        // @ts-ignore
                                        FakeResponseData.products[productKeys[index]].products,
                                        // @ts-ignore
                                        FakeResponseData.products[productKeys[index+1]].products,
                                    ]}
                                productInfo={{
                                    // @ts-ignore
                                    // className: `bg-[${FakeResponseData.products[productKey].colorSignatures}]`,
                                    name: [productKeys[index], productKeys[index+1]],
                                    image: [
                                        // @ts-ignore
                                        FakeResponseData.products[productKeys[index]].productImage,
                                        // @ts-ignore
                                        FakeResponseData.products[productKeys[index+1]].productImage,
                                    ]
                                }}
                                style={[
                                    {
                                        // @ts-ignore
                                        background: FakeResponseData.products[productKeys[index]].colorSignatures,
                                    },
                                    {
                                        // @ts-ignore
                                        background: FakeResponseData.products[productKeys[index+1]].colorSignatures,
                                    }
                                ]}

                            />
                        )
                    }
                })
            }
        </div>
    )

}

const Screen = (props: {} | any) => {
    return (
        <div className={"flex flex-col justify-center items-center"}>
            <NextOrderPanel orderID={"5232"} timeLeft={1000000000}/>
            <InlineTag content={"Thương hệu mang tới \"hạnh phúc đích thực\""} />
            <ProductView productKeys={props.productKeys}/>
            <InlineTag content={"Mùa hè sôi động cùng TH TRUEMILK với nhiều phần quà có giá trị lên tới 50 triệu đồng"} className={"mx-4 mb-4"}/>
            <SpinningWheel />
            <div className={"w-full text-md text-center capitalize font-semibold mx-4 text-gray-600 mb-[150px]"}>
                Hệ thống đang tự động tìm khách hàng may mắn
            </div>
            <MenuBar userData={props.userData}/>
        </div>
    )
}
export default function Page({}: {}) {
    const { push } = useRouter();
    const productKeys = Object.keys(FakeResponseData.products);
    const initial = useRef(false)

   const [userData, setUserData] = React.useState<any>(null);

    useLayoutEffect(() => {
       // if (!initial.current) {
       //     initial.current = true;
       //
       //     const access_token =  localStorage.getItem("access_token")
       //     // console.log(access_token)
       //     if(!access_token){
       //         return push("/");
       //     } else {
       //         // console.log(access_token)
       //         const verifyToken = async function() {
       //             return await fetch(`${AppConfig.mainApiUrl}/auth/profile`, {
       //                 method: "POST",
       //                 // cache: "force-cache",
       //                 headers: {
       //                     "Content-Type": "application/json",
       //                     "x-access-token": access_token
       //                 },
       //                 body: JSON.stringify({
       //                      access_token: access_token
       //                    }),
       //             })
       //                 .then(res => res.json())
       //                 .then(res => {
       //                     if(res.status === 200) setUserData(res.response);
       //                     else push("/");
       //                 }).catch(err => {console.log(err)})
       //         }
       //         verifyToken();
       //     }
       //     return;
       // }
    }, []);

    return (
        // userData
        <Screen userData={userData} productKeys={productKeys}/>
        // : <ThreeDotsWave />
    )
}

export const revalidate = false