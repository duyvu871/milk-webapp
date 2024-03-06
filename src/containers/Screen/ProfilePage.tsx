"use client";
import React, {useContext, useLayoutEffect} from "react";;
import { signOut } from "next-auth/react";
import ProfileFeatureComponent from "@/components/Profile/ProfileFeatureComponent";
import store from "@/redux/store";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/reducers";
import {showProfileScreen} from "@/redux/action/showPopup";
import {UserDataContext} from "@/contexts/UserDataContext";
import PopupLayout from "@/components/Modal/modal";

import { FaMoneyCheck } from "react-icons/fa";
import { GiRotaryPhone } from "react-icons/gi";
import { FaAngleRight } from "react-icons/fa6";
import { FaRegNewspaper } from "react-icons/fa";
import { AiOutlineStock } from "react-icons/ai";
import { MdCurrencyExchange } from "react-icons/md";
import { CiBank } from "react-icons/ci";
import { FaLock } from "react-icons/fa";
import { MdLogout } from "react-icons/md";





const FeatureItem = ({
icon, title, direct, clickHandle
}: {
    icon: React.ReactNode,
    title: string,
    direct?: string;
    clickHandle: () => void
}) => {
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
export default function ProfilePage() {
    const {userData} = useContext(UserDataContext);
    const {dispatch} = store;
    const { showModal } = useSelector((state: RootState) => state.profileScreen);
    const [FeatureType, setFeatureType] = React.useState<string>("");
    const [showRefillModal, setShowRefillModal] = React.useState<boolean>(false);
    // const refillModalRef = React.useRef<HTMLDialogElement>(null);
    const openFeature = (type: string) => {
        setFeatureType(type);
        dispatch(showProfileScreen());
    }

    return (
        <div className={"flex flex-col justify-center items-center"}>
            <div className={"main-gradiant flex flex-col justify-center items-center w-full rounded-b-3xl pb-12 relative"}>
                <div className={"text-md font-normal text-white m-2 capitalize"}>
                    Trung tâm thành viên
                </div>
                <div className={"flex flex-row items-center justify-start gap-1 w-full p-2 ml-4 text-xs font-normal text-white"}>
                    <div className={""}>
                        ID:
                    </div>
                    <div className={""}>
                        {userData.uid}
                    </div>
                </div>
                <div className={"flex flex-col justify-center items-center gap-2"}>
                    <div className={"text-white font-normal text-xs"}>
                        Số dư tài khoản
                    </div>
                    <div className={"text-3xl font-semibold text-white"}>
                        {userData.balance || 0}
                    </div>
                </div>

                <div className={"rounded-xl p-4 flex flex-row justify-center items-center absolute top-[80%] bg-[#103A49] border-white border-[1px]"}>
                    <div
                        className={"px-6 flex flex-col justify-center items-center border-r-[1px] border-white text-white font-normal cursor-pointer"}
                        onClick={() => {
                            setShowRefillModal(true);
                        }}
                    >
                        <FaMoneyCheck size={22}/>
                        <div>
                            Nạp điểm
                        </div>
                    </div>
                    <div className={"px-6 flex flex-col justify-center items-center text-white font-normal cursor-pointer "}
                        onClick={() => {
                            openFeature("PROFILE_WITHDRAW_ACTION");
                        }}
                    >
                        <GiRotaryPhone size={22}/>
                        <div>
                            Rút điểm
                        </div>
                    </div>
                </div>
            </div>
            <div className={"flex flex-col justify-center items-center w-full mt-16 p-4 gap-3 mb-[120px]"}>
                <FeatureItem icon={<FaMoneyCheck />} title={"Lịch sử tham gia"} clickHandle={() => {openFeature("PARTICIPATION_HISTORY");}}/>
                <FeatureItem icon={<FaRegNewspaper />} title={"Biến động số tiền"} clickHandle={() => {openFeature("POINT_FLUCTUATION");}}/>
                <FeatureItem icon={<AiOutlineStock />} title={"Lịch sử nạp"} clickHandle={() => {openFeature("TRANSACTION_HISTORY");}}/>
                <FeatureItem icon={<MdCurrencyExchange />} title={"Lịch sử rút"} clickHandle={() => {openFeature("WITHDRAW_HISTORY");}}/>
                <FeatureItem icon={<CiBank />} title={"Ngân hàng"} clickHandle={() => {openFeature("BANKING");}}/>
                <FeatureItem icon={<FaLock />} title={"Đổi mật khẩu"} clickHandle={() => {openFeature("CHANGE_PASSWORD");}}/>
                <FeatureItem icon={<MdLogout />} title={"Đăng xuất"} clickHandle={async () => {
                    return await signOut();
                }}/>
            </div>
            {/*<MenuBar />*/}
            {
                showModal && <ProfileFeatureComponent type={FeatureType} />
            }
            <PopupLayout
                popupTitle={"NẠP ĐIỂM"}
                isShowPopup={showRefillModal}
                onClose={setShowRefillModal}
                disableCloseButton={true}>
                <div className={"bg-white rounded-lg  overflow-hidden h-full"}>
                    <div className={"text-[18px] font-semibold uppercase mb-[15px] text-center"}>NẠP ĐIỂM</div>
                    <div className={"text-center text-[14px] font-semibold mb-[15px] leading-[18px]"}>Vui lòng liên hệ với CSKH để được hướng dẫn nạp điểm</div>
                    <div className={"flex flex-row justify-center items-center gap-3"}>
                        <button
                            className={"bg-[#113b49] text-sm font-semibold uppercase text-white mx-[5px] my-0 px-[15px] py-2.5 rounded-[5px] border-[none]"}
                            onClick={() => {
                                setShowRefillModal(false);
                            }}
                        >Đồng ý
                        </button>
                    </div>
                </div>
            </PopupLayout>
        </div>
    )
}

