import {tw} from "@/ultis/tailwind.ultis";
import Link from "next/link";
import { formatCurrency } from "@/ultis/currency-format";
import React, {JSX} from "react";
import { useContext } from "react";
import {LivechatWidgetContext, LiveChatWidgetProvider} from "@/contexts/livechatWidgetContext";

// import icons
import { IoMdHome } from "react-icons/io";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { RiCustomerService2Fill } from "react-icons/ri";


const UserInfo = ({id, balance}: {id: string; balance: string}) => {
    return (
        <div className={tw(
            "flex flex-row justify-between items-center w-full h-full px-4 py-2 text-white font-bold text-xs ",
        )}>
            <span className={"text-md font-bold"}>
               ID: {id}
            </span>
            <span className={"text-md font-bold"}>
               Số dư tài khoản: {balance}
            </span>
        </div>

    )
}

const MenuItemWrapper = ({children}: {children: React.ReactNode}) => {
    return (
        <div className={tw(
            "flex flex-row justify-between items-center w-full h-full px-4 py-2 text-white font-bold text-xs ",
        )}>
            {children}
        </div>
    )
}

const MenuItem = ({children, direct, preventDirect = false}: {children: React.ReactNode; direct: string; preventDirect?: boolean}) => {

    const TargetRender: JSX.Element = (
        preventDirect
            ? (
                <div className={tw(
                    "cursor-pointer flex flex-col justify-between items-center px-4 py-2 text-white font-bold text-xs",
                )}>
                    {children}
                </div>
            )
            : (
                <Link href={direct}>
                    <div className={tw(
                        "flex flex-col justify-between items-center px-4 py-2 text-white font-bold text-xs",
                    )}>
                        {children}
                    </div>
                </Link>
            )
    )

    return TargetRender;
}

export default function MenuBar({userData}: {userData: any}) {

    const {openWidget, closeWidget} = useContext(LivechatWidgetContext);
    // console.log("userData: ", userData);
    const [toggleBoxChat, setToggleBoxChat] = React.useState<boolean>(false);

    const toggleChat = () => {
        setToggleBoxChat(!toggleBoxChat);
        if (toggleBoxChat) {
            //@ts-ignore
            // LiveChatWidget.call('maximize');
            openWidget();
        } else {
            //@ts-ignore
            // LiveChatWidget.call('hide');
            closeWidget();
        }
    }

    return (
        <div className={"flex flex-col bg-[#103A49] w-full fixed bottom-0 max-w-[500px]"}>
            <UserInfo id={userData?.["_id"]} balance={"10000"}/>
            <MenuItemWrapper>
                <MenuItem direct={"/home"}>
                    <IoMdHome size={20} color={"white"}/>
                    <span className={"text-md font-bold text-white"}>
                        Home
                    </span>
                </MenuItem>
                <MenuItem direct={"/trending"}>
                    <FaArrowTrendUp size={20} color={"white"}/>
                    <span className={"text-md font-bold text-white"}>
                        Xu Hướng
                    </span>
                </MenuItem>
                <MenuItem direct={"/profile"}>
                    <FaUser size={20} color={"white"}/>
                    <span className={"text-md font-bold text-white"}>
                        Cá Nhân
                    </span>
                </MenuItem>

                <MenuItem direct={"/support"} preventDirect={true}>
                    <div className={"flex flex-col justify-center items-center"} onClick={() => {
                        toggleChat();
                    }}>
                        <RiCustomerService2Fill size={20} color={"white"}/>
                        <div data-id="PVDUYam_NJQ" className="livechat_button">
                        <span className={"text-md font-bold text-white"}>
                            CSKH
                        </span>
                        </div>
                    </div>
                </MenuItem>
            </MenuItemWrapper>
        </div>
    )
}