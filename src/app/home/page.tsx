

import NextOrderPanel from '@/components/NextOrderPanel'
import InlineTag from "@/components/Tag/Inline";
import NextOrderProduct from "@/components/NextOrderPanel/NextOrderProduct";
import MenuBar from "@/components/MenuBar";
import SpinningWheel from "@/components/SpinningWheel";

import FakeResponseData from "@/fakeData/fakeResponseData";

export default function Page({}: {}) {

    const productKeys = Object.keys(FakeResponseData.products);


    return (
        <div className={"flex flex-col justify-center items-center"}>
            <NextOrderPanel orderID={"5232"} timeLeft={100000}/>
            <InlineTag content={"Thương hệu mang tới \"hạnh phúc đích thực\""} />
            <div className={"flex flex-row flex-1 justify-around items-start gap-2 w-full my-4"}>
                {
                    productKeys.map((productKey, index) => {
                        console.log("productKey: ", index);
                        if (index%2 === 0) {
                            // console.log("productKey: ", index)
                           return (
                                <NextOrderProduct
                                    key={"product-" + index}
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
            <InlineTag content={"Mùa hè sôi động cùng TH TRUEMILK với nhiều phần quà có giá trị lên tới 50 triệu đồng"} className={"mx-4 mb-4"}/>
            <SpinningWheel />
            <div className={"w-full text-md text-center capitalize font-semibold mx-4 text-gray-600 mb-[150px]"}>
                Hệ thống đang tự động tìm khách hàng may mắn
            </div>
            <MenuBar/>
        </div>
    )
}