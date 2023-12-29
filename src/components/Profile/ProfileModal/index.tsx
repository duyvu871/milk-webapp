import {FaTimes} from "react-icons/fa";
import {LiaTimesSolid} from "react-icons/lia";
import React from "react";


const ProfileModalHeading = ({handleClose, title}: {handleClose: () => void; title: string}) => {
    return (
        <div className={"px-[20px] py-[15px] relative border-b-[1px] border-y-gray-300 flex justify-center items-center bg-[#113b49]"}>
            <div className={"text-white text-[18git px] leading-[30px] font-normal capitalize"}>{title}</div>
            <div className={"absolute right-0 top-[34px] px-4 text-center leading-[40px] mt-[-20px] text-[20px] font-thin cursor-pointer"} onClick={handleClose}>
                <LiaTimesSolid size={25} color={"white"} className={""}/>
            </div>
        </div>
    )
}

const ProfileModalContent = ({content}: {content: React.ReactNode}) => {
    return (
        <div className={"px-[20px] py-[10px] h-[calc(100%-50px)] overflow-y-auto text-justify text-[16px] text-[#113b49] leading-[26px] font-medium"}>
            {content}
        </div>
    )
}

export default function ProfileModalComponent({closeHandler, content, title}: { closeHandler: () => void; content: React.ReactNode; title: string }) {
    return (
        <div className={"fixed top-0 left-0 right-0 w-full h-full bg-white mx-auto my-0"}>
            <ProfileModalHeading handleClose={closeHandler} title={title}/>
            <ProfileModalContent content={content}/>
        </div>
    )
}
