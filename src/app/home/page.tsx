"use client"

import NextOrderPanel from '@/components/NextOrderPanel'
import InlineTag from "@/components/Tag/Inline";
import NextOrderProduct from "@/components/NextOrderPanel/NextOrderProduct";
import MenuBar from "@/components/MenuBar";
import SpinningWheel from "@/components/SpinningWheel";
import ThreeDotsWave from "@/components/Loading/ThreeDotsWave";

import FakeResponseData from "@/fakeData/fakeResponseData";
import React, {useContext, useEffect, useLayoutEffect, useRef} from "react";
import AppConfig from "@/configs/App.config";
import { useRouter } from 'next/navigation';
import {BankingRule} from "@/components/RuleInfo";
import PopupLayout from "@/components/Modal/modal";
import {OpenPopupContext} from "@/contexts/openPopupContext";
import {connect, ConnectedProps} from "react-redux";
import { showModal } from "@/redux/action/showPopup";
import {FaMinusCircle, FaPlusCircle} from "react-icons/fa";

const mapDispatchToProps = {
    dispatchShowModal: showModal
}

const connector = connect(null, mapDispatchToProps);

const ProductView = ({productKeys, stateControl}: {productKeys: string[], stateControl: Record<any, {state: any, setState: (value: any) => void}>}) => {
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
                                stateControl={stateControl}
                            />
                        )
                    }
                })
            }
        </div>
    )

}

const Screen = (props: {} | any) => {
    const [isOpenInfoPopup, setIsOpenInfoPopup] = React.useState<boolean>(false);
    const [isOpenPopup, setOpenPopup] = React.useState<boolean>(false);

    return (
        <>
            <div className={"flex flex-col justify-center items-center"}>
                <NextOrderPanel orderID={"5232"} timeLeft={1000000000} stateControl={{
                    showPopup: {
                        state: isOpenInfoPopup,
                        setState: setIsOpenInfoPopup
                    }
                }}/>
                <InlineTag content={"Thương hiệu mang tới \"hạnh phúc đích thực\""}/>
                <ProductView productKeys={props.productKeys} stateControl={{
                    showPopup: {
                        state: isOpenPopup,
                        setState: setOpenPopup
                    }
                }}/>
                <InlineTag
                    content={"Mùa hè sôi động cùng TH TRUEMILK với nhiều phần quà có giá trị lên tới 50 triệu đồng"}
                    className={"mx-4 mb-4"}/>
                <SpinningWheel/>
                <div className={"w-full text-md text-center uppercase font-semibold mx-4 text-gray-600 mb-[150px]"}>
                    Hệ thống đang tự động tìm khách hàng may mắn
                </div>
                <MenuBar userData={props.userData}/>
            </div>
            <PopupLayout isShowPopup={isOpenPopup} popupTitle={""} onClose={() => {setOpenPopup(false)}} disableCloseButton={true}>
                <div className={"flex flex-col justify-center items-center"}>
                    <h1  className={"font-semibold"}>
                        SỐ LƯỢNG
                    </h1>
                    <div className={"flex flex-row justify-center items-center gap-4 mt-4"}>
                        <div className={""}>
                            <FaMinusCircle className={"text-[#113b49]"}/>
                        </div>
                        <div className={""}>
                            <div className={"px-16 py-2 border-[1px] border-red-500 text-red-500 text-sm font-semibold rounded-full"} contentEditable={true}>
                                1000
                            </div>
                        </div>
                        <div className={""}>
                            <FaPlusCircle className={"text-[#113b49]"}/>
                        </div>
                    </div>
                    <div className={"text-red-500 text-xs mb-4 mt-2"}>
                        Số dư không đủ
                    </div>
                    <div className={"flex flex-row flex-wrap justify-around items-center gap-3"}>
                        <div className={"w-[68px] leading-4 text-center font-semibold border cursor-pointer mb-2.5 px-0 py-[7px] rounded-[3px] border-solid border-[#113b49] "}>50</div>
                        <div className={"w-[68px] leading-4 text-center font-semibold border cursor-pointer mb-2.5 px-0 py-[7px] rounded-[3px] border-solid border-[#113b49] "}>500</div>
                        <div className={"w-[68px] leading-4 text-center font-semibold border cursor-pointer mb-2.5 px-0 py-[7px] rounded-[3px] border-solid border-[#113b49] bg-[#113b49] text-white"}>1,000</div>
                        <div className={"w-[68px] leading-4 text-center font-semibold border cursor-pointer mb-2.5 px-0 py-[7px] rounded-[3px] border-solid border-[#113b49] "}>5,000</div>
                        <div className={"w-[68px] leading-4 text-center font-semibold border cursor-pointer mb-2.5 px-0 py-[7px] rounded-[3px] border-solid border-[#113b49] "}>10,000</div>
                        <div className={"w-[68px] leading-4 text-center font-semibold border cursor-pointer mb-2.5 px-0 py-[7px] rounded-[3px] border-solid border-[#113b49] "}>30,000</div>
                        <div className={"w-[68px] leading-4 text-center font-semibold border cursor-pointer mb-2.5 px-0 py-[7px] rounded-[3px] border-solid border-[#113b49] "}>50,000</div>
                        <div className={"w-[68px] leading-4 text-center font-semibold border cursor-pointer mb-2.5 px-0 py-[7px] rounded-[3px] border-solid border-[#113b49] "}>100,000</div>
                    </div>
                    <div className={"mt-4 mb-2 flex flex-row justify-center items-center "}>
                        <button
                            className={"bg-[#ddd] cursor-pointer text-sm font-semibold uppercase text-[#113b49] mx-[5px] my-0 px-[15px] py-2.5 rounded-[50px] border-[none]"}>
                            HUỶ
                        </button>
                        <button
                            className={"bg-[#ddd] cursor-pointer text-sm font-semibold uppercase text-[#113b49] mx-[5px] my-0 px-[15px] py-2.5 rounded-[50px] border-[none]"}>
                            XÁC NHẬN
                        </button>
                    </div>
                </div>
            </PopupLayout>
            {
                isOpenInfoPopup && <BankingRule closeHandler={() => {
                    setIsOpenInfoPopup(false);
                }}/>
            }
        </>
    )
}
export default function Page({}: {}) {
    const {push} = useRouter();
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