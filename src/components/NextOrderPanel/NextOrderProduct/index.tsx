import Image from 'next/image';
import { tw } from '@/ultis/tailwind.ultis';

// import icons
import { RiShieldCheckFill } from "react-icons/ri";

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
}

interface ProductBannerProps {
    name: string;
    image: string;
    className?: string;
    style?: React.CSSProperties;
}

const ProductBanner = ({ name, image, className, style }: ProductBannerProps) => {
    return (
        <div className={tw(
            "flex flex-row justify-center items-center gap-2 px-4 text-white font-bold text-xs border-2 border-black rounded-md",
            className || "",
            )}
            style={style}
        >
            <span className={"text-md font-bold"}>
                {name}
            </span>
            <Image src={image} width={50} height={50} alt={"product banner"}/>
        </div>
    )
}

export default function  NextOrderProduct({
    orderID, products, productInfo: {
        name, image, className
    },
    style
}: Props) {
    // console.log(products)
    return (
     <div className={"flex flex-col justify-center items-center gap-2 h-full w-full"} >
            {/*<ProductBanner name={name} image={image} className={tw(className||"", "border-[#68878E] w-full ")} style={style}/>*/}
            <div className={"flex flex-row justify-center items-center w-full gap-4"}>
                <ProductBanner name={name[0]} image={image[0]} className={tw( "border-[#68878E] w-[calc(50%-20px)] ")} style={style?.[0]}/>
                <ProductBanner name={name[1]} image={image[1]} className={tw("border-[#68878E] w-[calc(50%-20px)] ")} style={style?.[1]}/>
            </div>

            <div className={"flex flex-row justify-center items-center w-full gap-4"}>
                <div className={"text-sm text-center border-2 border-[#68878E] rounded-md mb-4 w-[calc(50%-20px)]"}>
                    Số Lượng Hàng Ngày: {products[0].length}
                </div>
                <div className={"text-sm text-center border-2 border-[#68878E] rounded-md mb-4 w-[calc(50%-20px)]"}>
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
                                <div className={"flex flex-row justify-between items-center w-[calc(50%-20px)] h-full gap-2 border-2 border-[#68878E] rounded-md"} key={"product-" + index}>
                                    <div className={"text-start break-normal"}>
                                        {products[0][index].name}
                                    </div>
                                    <div className={"text-center"}>
                                        <RiShieldCheckFill size={24} color={"#68878E"}/>
                                    </div>
                                </div>
                                <div className={"flex flex-row justify-between items-center w-[calc(50%-20px)] h-full gap-2 border-2 border-[#68878E] rounded-md"} key={"product-" + index}>
                                    <div className={"text-start break-normal "}>
                                        {products[1][index].name}
                                    </div>
                                    <div className={"text-center"}>
                                        <RiShieldCheckFill size={24} color={"#68878E"}/>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
     </div>
    )
}