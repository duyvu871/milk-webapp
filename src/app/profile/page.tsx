"use client";
import MenuBar from "@/components/MenuBar";
import React, {useLayoutEffect} from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { logout } from "@/services/authenticate";
//icons import
import { FaMoneyCheck } from "react-icons/fa";
import { GiRotaryPhone } from "react-icons/gi";
import { FaAngleRight } from "react-icons/fa6";
import { FaRegNewspaper } from "react-icons/fa";
import { AiOutlineStock } from "react-icons/ai";
import { MdCurrencyExchange } from "react-icons/md";
import { CiBank } from "react-icons/ci";
import { FaLock } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import {LiveChatWidgetProvider} from "@/contexts/livechatWidgetContext";
import {BankingRule} from "@/components/RuleInfo";
import ProfileFeatureComponent from "@/components/Profile/ProfileFeatureComponent";

const FeatureItem = ({icon, title, direct, clickHandle}: {icon: React.ReactNode, title: string, direct?: string; clickHandle: () => void}) => {
    return (
        <div className={"flex flex-row justify-between items-center w-full p-2 border-b-[1px] border-b-gray-20000 cursor-pointer"} onClick={clickHandle}>
            <div className={"flex flex-row justify-center items-center gap-2"}>
                <div className={"text-xl text-[#68878E] flex flex-row justify-center items-center"}>
                    {icon}
                </div>
                <div className={"text-md text-[#68878E] font-semibold "}>
                    {title}
                </div>
            </div>
            <div className={"text-md text-[#68878E] font-semibold opacity-80"}>
                {/*<Link href={direct}>*/}
                    <FaAngleRight />
                {/*</Link>*/}
            </div>

        </div>
    )
}
export default function Page() {

    const [isOpenInfoPopup, setIsOpenInfoPopup] = React.useState<boolean>(false);
    const { push } = useRouter();
    // const [userData, setUserData] = React.useState<any>(null);

    const [FeatureType, setFeatureType] = React.useState<string>("");

    useLayoutEffect(() => {
        // if (!initial.current) {
        //     initial.current = true;
        //
        const access_token =  localStorage.getItem("access_token")
        // console.log(access_token)
        if(!access_token){
            return push("/");
        } else {
            // console.log(access_token)
            const verifyToken = async function() {
                return await fetch(`/api/v1/auth/validateUser`, {
                    method: "POST",
                    // cache: "force-cache",
                    headers: {
                        "Content-Type": "application/json",
                        "x-access-token": access_token
                    },
                    body: JSON.stringify({
                        access_token: access_token
                    }),
                })
                    .then(res => res.json())
                    .then(res => {
                        if(res.status === 200) {
                            //setUserData(res.data.user);
                        }
                        else {
                            alert("not validate user")
                            push("/");
                        }
                    }).catch(err => {console.log(err)})
            }
            verifyToken();
        }
        //     return;
        // }
    }, []);

    return (
        <div className={"flex flex-col justify-center items-center"}>
            <div className={"main-gradiant flex flex-col justify-center items-center w-full rounded-b-3xl pb-12 relative"}>
                <div className={"text-md font-semibold text-white m-2"}>
                    Trung tâm thành viên
                </div>
                <div className={"flex flex-row items-center justify-start w-full p-2 ml-4 text-xs font-semibold text-white"}>
                    <div className={""}>
                        ID:
                    </div>
                    <div className={""}>
                        121212
                    </div>
                </div>
                <div className={"flex flex-col justify-center items-center"}>
                    <div className={"text-white font-semibold text-xs"}>
                        Số dư tài khoản
                    </div>
                    <div className={"text-2xl font-bold text-white"}>
                        0
                    </div>
                </div>

                <div className={"rounded-xl p-4 flex flex-row justify-center items-center absolute top-[80%] bg-[#103A49] border-white border-[2px]"}>
                    <div className={"px-6 flex flex-col justify-center items-center border-r-[2px] border-white text-white font-semibold opacity-80"}>
                        <FaMoneyCheck />
                        <div>
                            Nạp tiền
                        </div>
                    </div>
                    <div className={"px-6 flex flex-col justify-center items-center text-white font-semibold opacity-80"}>
                        <GiRotaryPhone />
                        <div>
                            Rút điểm
                        </div>
                    </div>
                </div>
            </div>
            <div className={"flex flex-col justify-center items-center w-full mt-16 p-4 gap-3"}>
                <FeatureItem icon={<FaMoneyCheck />} title={"Lịch sử giao dịch"} clickHandle={() => {setFeatureType("CHANGE_PASSWORD");setIsOpenInfoPopup(true)}}/>
                <FeatureItem icon={<FaRegNewspaper />} title={"Biến động số tiền"} clickHandle={() => {setFeatureType("CHANGE_PASSWORD");setIsOpenInfoPopup(true)}}/>
                <FeatureItem icon={<AiOutlineStock />} title={"Lịch sử nạp"} clickHandle={() => {setFeatureType("CHANGE_PASSWORD");setIsOpenInfoPopup(true)}}/>
                <FeatureItem icon={<MdCurrencyExchange />} title={"Lịch sử rút"} clickHandle={() => {setFeatureType("CHANGE_PASSWORD");setIsOpenInfoPopup(true)}}/>
                <FeatureItem icon={<CiBank />} title={"Ngân hàng"} clickHandle={() => {setFeatureType("CHANGE_PASSWORD");setIsOpenInfoPopup(true)}}/>
                <FeatureItem icon={<FaLock />} title={"Đổi mật khẩu"} clickHandle={() => {setFeatureType("CHANGE_PASSWORD");setIsOpenInfoPopup(true)}}/>
                <FeatureItem icon={<MdLogout />} title={"Đăng xuất"} clickHandle={() => {
                    logout();
                    push("/");
                }}/>
            </div>
            <LiveChatWidgetProvider>
                <MenuBar userData={{}}/>
            </LiveChatWidgetProvider>

            {
                isOpenInfoPopup && <ProfileFeatureComponent type={FeatureType}  closeHandle={() => {
                    setIsOpenInfoPopup(false);
                }}/>
            }
        </div>
    )
}