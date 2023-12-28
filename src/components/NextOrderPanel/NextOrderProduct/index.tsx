import Image from 'next/image';
import { tw } from '@/ultis/tailwind.ultis';
import { useSelector, useDispatch } from "react-redux";
// import showPopup from "@/redux/action/showPopup";

// import icons
import { RiShieldCheckFill } from "react-icons/ri";
import PopupLayout from "@/components/Modal/modal";
import React from "react";
import {FaMinusCircle, FaPlusCircle} from "react-icons/fa";

interface IProduct {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
}

interface NextOrderProductProps {
    orderID: string;
    products: Array<IProduct[]>;
}

interface Props extends NextOrderProductProps {
    productInfo: {
        name: string[];
        image: string[],
        className?: string[];
    }
    style?: Array<React.CSSProperties>;
    stateControl?: Record<any, {
        state: any;
        setState: (value: any) => void;
    }>
}

interface ProductBannerProps {
    name: string;
    image: string;
    className?: string;
    style?: React.CSSProperties;
    clickHandle?: () => void;
}

const ProductBanner = ({ name, image, className, style, clickHandle }: ProductBannerProps) => {
    return (
        <div className={tw(
            "flex flex-row justify-center items-center gap-2 px-4 text-white font-bold text-xs rounded-[3px] border-black border-[1px]",
            className || "",
            )}
            style={style}
             onClick={clickHandle}
        >
            <span className={"text-md font-bold"}>
                {name}
            </span>
            <Image src={image} width={50} height={50} alt={"product banner"}/>
        </div>
    )
}

// const ProductItem = ({ name, index}: { name: string, index: number }) => {
//     return (
//         <div
//             className={"flex flex-row justify-between items-center w-[calc(50%-20px)] h-full gap-2 border-[1px] border-[#68878E] rounded-[3px] h-inherit hover:bg-[#ff632c] hover:opacity-100 hover:text-white hover:transition-all cursor-pointer"}
//             key={"product-" + index}>
//             <div className={"text-start break-normal uppercase"}>
//                 {products[0][index].name}
//             </div>
//             <div className={"text-center"}>
//                 <RiShieldCheckFill size={24} color={"#68878E"}/>
//             </div>
//         </div>
//     )
// }

const ProductRender = ({products}: { products: Array<IProduct[]> }) => {
    return (
        <div className={"flex flex-col gap-2 text-sm w-full"}>
            {
                products[0].map((product, index) => {
                    return (
                        <div className={"flex flex-row items-stretch justify-center gap-4"} key={"item-" + index}>
                            {
                                // @ts-ignore
                                product.map((product, index) => {
                                    return (
                                        <div
                                            className={"flex flex-row justify-between items-center w-[calc(50%-20px)] h-full gap-2 border-[1px] border-[#68878E] rounded-[3px] h-inherit hover:bg-[#ff632c] hover:opacity-100 hover:text-white hover:transition-all cursor-pointer"} key={"product-" + index}>
                                            <div className={"text-start break-normal uppercase"}>
                                                {product.name}
                                            </div>
                                            <div className={"text-center"}>
                                                <RiShieldCheckFill size={24} color={"#68878E"}/>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            {/*<div className={"flex flex-row justify-between items-center w-[calc(50%-20px)] h-full gap-2 border-[1px] border-[#68878E] rounded-[3px] h-inherit hover:bg-[#ff632c] hover:opacity-100 hover:text-white hover:transition-all cursor-pointer"} key={"product-" + index}>*/}
                            {/*    <div className={"text-start break-normal uppercase"}>*/}
                            {/*        {product.name}*/}
                            {/*    </div>*/}
                            {/*    <div className={"text-center"}>*/}
                            {/*        <RiShieldCheckFill size={24} color={"#68878E"}/>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                        </div>
                    )
                })
            }
        </div>
    )

}

export default function  NextOrderProduct({
    orderID, products, productInfo: {
        name, image, className
    },
    style,
    stateControl
}: Props) {
    // const [isOpenPopup, setOpenPopup] = React.useState<boolean>(false);

    return (
     <div className={"flex flex-col justify-center items-center gap-2 h-full w-full"} >
            {/*<ProductBanner name={name} image={image} className={tw(className||"", "border-[#68878E] w-full ")} style={style}/>*/}
            <div className={"flex flex-row justify-center items-center w-full gap-4"}>
                <ProductBanner
                    name={name[0]}
                    image={image[0]}
                    className={tw( "border-[#68878E] w-[calc(50%-20px)] py-3 cursor-pointer")}
                    style={style?.[0]}
                    clickHandle={() => {
                        stateControl?.showPopup.setState(true);
                        alert("showPopup")
                    }}
                />
                <ProductBanner
                    name={name[1]}
                    image={image[1]}
                    className={tw("border-[#68878E] w-[calc(50%-20px)] py-3 cursor-pointer")}
                    style={style?.[1]}
                    clickHandle={() => {
                        stateControl?.showPopup.setState(true);
                        alert("showPopup")
                    }}
                />
            </div>

            <div className={"flex flex-row justify-center items-center w-full gap-4"}>
                <div className={"text-sm text-center border-[1px] border-[#68878E] rounded-[3px] mb-4 w-[calc(50%-20px)] cursor-pointer"} onClick={() => {
                    stateControl?.showPopup.setState(true);
                    // alert("showPopup")
                }}>
                    Số Lượng Hàng Ngày: {products[0].length}
                </div>
                <div className={"text-sm text-center border-[1px] border-[#68878E] rounded-[3px] mb-4 w-[calc(50%-20px)] cursor-pointer"}  onClick={() => {
                    stateControl?.showPopup.setState(true);
                    // alert("showPopup")
                }}>
                    Số Lượng Hàng Ngày: {products[1].length}
                </div>
            </div>
            {/*<div className={"text-sm text-center border-2 border-[#68878E] rounded-md mb-4 w-full"}>*/}
            {/*    Số Lượng Hàng Ngày: {products.length}*/}
            {/*</div>*/}
            <div className={"flex flex-col gap-2 text-sm w-full"}>
                {
                    products[0].map((product, index) => {

                        // console.log(product)
                        return (
                            <div className={"flex flex-row items-stretch justify-center gap-4"} key={"item-"+index}>
                                <div
                                    onClick={() => {
                                        stateControl?.showPopup.setState(true);
                                        // alert("showPopup")
                                    }}
                                    className={"flex flex-row justify-between items-center w-[calc(50%-20px)] h-full gap-2 border-[1px] border-[#68878E] rounded-[3px] h-inherit hover:bg-[#ff632c] hover:opacity-100 hover:text-white hover:transition-all cursor-pointer"} key={"product-" + index}>
                                    <div className={"text-start break-normal uppercase"}>
                                        {products[0][index].name}
                                    </div>
                                    <div className={"text-center"}>
                                        <RiShieldCheckFill size={24} color={"#68878E"}/>
                                    </div>
                                </div>
                                <div
                                    onClick={() => {
                                        stateControl?.showPopup.setState(true);
                                        // alert("showPopup")
                                    }}
                                    className={"flex flex-row justify-between items-center w-[calc(50%-20px)] h-full gap-2 border-[1px] border-[#68878E] rounded-[3px] h-inherit hover:bg-[#ff632c] hover:opacity-100 hover:text-white hover:transition-all cursor-pointer"} key={"product-" + index}>
                                    <div className={"text-start break-normal uppercase"}>
                                        {products[1][index].name}
                                    </div>
                                    <div className={"text-center"} >
                                        <RiShieldCheckFill size={24} color={"#68878E"}/>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

         {/*<ProductRender product={products}/>*/}
     </div>
    )
}