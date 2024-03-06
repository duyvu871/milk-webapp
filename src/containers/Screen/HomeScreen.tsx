"use client";
import NextOrderPanel from '@/components/NextOrderPanel'
import InlineTag from "@/components/Tag/Inline";
import NextOrderProduct from "@/components/NextOrderPanel/NextOrderProduct";
import MenuBar from "@/components/MenuBar";
import SpinningWheel from "@/components/SpinningWheel";

import FakeResponseData from "@/fakeData/fakeResponseData";
import React, {useContext, useEffect, useLayoutEffect, useRef} from "react";

import {BankingRule} from "@/components/RuleInfo";
import PopupLayout from "@/components/Modal/modal";
// import {FaMinusCircle, FaPlusCircle} from "react-icons/fa";
import useOrder from "@/hooks/useOrder";
import * as timers from "timers";
import PlaceBetModal from "@/components/Modal/PlaceBetModal";

interface HomeScreenProps {
    userData: any;
    productKeys: string[];

}

const ProductView = ({productKeys, stateControl}: {productKeys: string[], stateControl: Record<any, {state: any, setState: (value: any) => void}>}) => {
    return (
        <div className={"flex flex-row flex-1 justify-around items-start gap-2 w-full my-4"}>
            {
                productKeys.map((productKey, index) => {
                    // console.log("productKey: ", index);
                    if (index%2 === 0) {
                        // console.log("productKey: ", productKey)
                        return (
                            <NextOrderProduct
                                key={"products-" + productKey + index}
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

const HomeScreen = (props: {} | any) => {
    const [isOpenInfoPopup, setIsOpenInfoPopup] = React.useState<boolean>(false);
    const [isOpenPopup, setOpenPopup] = React.useState<boolean>(false);
    const { orderTimeLeft } = useOrder();
    const [betTarget, setBetTarget] = React.useState<"TH TRUEMILK"|"VINAMILK"|null>(null);
    useLayoutEffect(() => {
        // console.log("betTarget: ", betTarget);
    }, [betTarget]);

    return (
        <>
            <div className={"flex flex-col justify-center items-center"}>
                <NextOrderPanel orderID={"5232"} timeLeft={orderTimeLeft} stateControl={{
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
                    },
                    setBetTarget: {
                        state: betTarget,
                        setState: setBetTarget
                    }
                }}/>
                <InlineTag
                    content={"Mùa hè sôi động cùng TH TRUEMILK với nhiều phần quà có giá trị lên tới 50 triệu đồng"}
                    className={"mx-4 mb-4"}/>
                <SpinningWheel/>
                <div className={"w-full text-md text-center uppercase font-semibold mx-4 text-gray-600 mb-[150px]"}>
                    Hệ thống đang tự động tìm khách hàng may mắn
                </div>
                {/*<MenuBar />*/}
            </div>
            <PopupLayout isShowPopup={isOpenPopup} popupTitle={""} onClose={() => {setOpenPopup(false)}} disableCloseButton={true}>
                <PlaceBetModal setOpenPopup={setOpenPopup} betTarget={betTarget}/>
            </PopupLayout>
            {
                isOpenInfoPopup && <BankingRule closeHandler={() => {
                    setIsOpenInfoPopup(false);
                }}/>
            }
        </>
    )
}

export default HomeScreen;
