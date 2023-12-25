import Image from "next/image";

import { CiMap, CiMail } from "react-icons/ci";
// import { CiMail } from "react-icons/ci";
import {FaFacebook, FaGoogle, FaPhoneAlt, FaPinterest, FaTwitter, FaYoutube} from "react-icons/fa";

export default function IntroductionFooter() {
    return (
        <div className={"bg-[#333] w-full flex flex-col justify-center items-center py-6"}>
            <div className={"container mx-auto px-4"}>
                <div className={"mb-5"}>
                    <Image src={"/vinamilk-logo.png"} alt={"logo"} className={"w-full h-full"} width={100} height={100} />
                    <div className={"flex flex-col justify-center items-start gap-2 mt-4"}>
                        <span
                            className={"text-[#a3a3a3] text-md "}>HÀ NAM MILK luôn đồng hành cùng khách hàng</span>
                        <span
                            className={"text-[#a3a3a3] text-md "}>HÀ NAM MILK Chất Lượng Cùng Năm Tháng</span>
                        <span className={"text-[#a3a3a3] text-md "}>CUNG CẤP SỮA UY TIN VIỆT NAM</span>
                    </div>
                    <h1 className={"text-white text-xl font-bold mb-2"}>
                        Liên hệ
                    </h1>
                    <div className={"flex flex-col justify-center items-start gap-2"}>
                        <div className={"flex flex-row justify-center items-start gap-2"}>
                            <CiMap className={"text-[#a3a3a3] text-xl gap-2"}/>
                            <span className={"text-[#a3a3a3] text-xs "}>Thôn Đô Quan, Xã Mộc Nam, Thị xã Duy Tiên, Tỉnh Hà Nam, Việt Nam</span>
                        </div>
                        <div className={"flex flex-row justify-center items-center gap-2"}>
                            <CiMail className={"text-[#a3a3a3] text-xl"}/>
                            <span className={"text-[#a3a3a3] text-xs "}>HÀNAMMILK@gmail.com.vn</span>
                        </div>
                        <div className={"flex flex-row justify-center items-center gap-2"}>
                            <FaPhoneAlt className={"text-[#a3a3a3] text-xs"}/>
                            <span className={"text-[#a3a3a3] text-xs "}>0123456789</span>
                        </div>
                    </div>
                    <h1 className={"text-white text-xl font-bold mb-2"}>
                        Chính sách công ty
                    </h1>
                    <div className={"flex flex-col justify-center items-start gap-2"}>
                        <span className={"text-[#a3a3a3] text-md "}>Chính sách dịch vụ</span>
                        <span className={"text-[#a3a3a3] text-md "}>Bảo mật thông tin</span>
                        <span className={"text-[#a3a3a3] text-md "}>Chính sách ba hành</span>
                    </div>
                </div>
            </div>
            <div className={"footer-contract flex flex-row justify-between items-stretch gap-10 mb-4"}>
                <div className={"text-white font-bold text-[8px]"}>HA NAM MILK JOINT STOCK COMPANY</div>
                <div className={"flex flex-row justify-center items-center text-white text-xl gap-2"}>
                    <FaFacebook />
                    <FaTwitter />
                    <FaGoogle />
                    <FaPinterest />
                    <FaYoutube />
                </div>
            </div>
        </div>
    )
}
