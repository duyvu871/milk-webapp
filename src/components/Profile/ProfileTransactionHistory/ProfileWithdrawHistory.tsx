import React, {useContext, useEffect} from 'react';
import {tw} from "@/ultis/tailwind.ultis";
import {UserDataContext} from "@/contexts/UserDataContext";
import {formatISODate} from "@/ultis/timeFormat.ultis";
import StatusBadge from "@/components/Badge/StatusBadge";
import {OrderType, OrderStatus} from "types/order";


interface ProfileWithdrawHistoryProps {

};

const WithdrawHistoryItem = ({time, amount, status}: {time: string; amount: string; status: OrderType['status']}) => {
    const spanClass = 'text-left py-2 px-1';
    return (
        <div className={tw("flex justify-between items-center border-b-[2px] cursor-pointer text-sm")}>
            <span className={tw(spanClass, "w-[50%]")}>{time}</span>
            <span className={tw(spanClass, "w-[30%]")}>{amount}</span>
            <span className={tw(spanClass, "w-[20%]")}>
                <StatusBadge status={status} value={OrderStatus[status]}/>
            </span>
        </div>
    )
}

function ProfileWithdrawHistory({}: ProfileWithdrawHistoryProps) {
    const { userWithdrawalHistory } = useContext(UserDataContext);
    const spanClass = 'text-left py-2 px-1';
    return (
        <div>
            <div className="flex justify-between items-center mb-2.5 px-[5px] py-2.5 rounded-[5px] bg-[#113b49] text-sm">
                <div className="text-white">
                    <span>Tổng số đơn:</span> <b>{userWithdrawalHistory.length}</b>
                </div>
                <div className="text-white">
                    <span>Tổng tiền nạp:</span> <b>0</b>
                </div>
            </div>
            <div className="">
                <div
                    className="rounded-[5px] bg-[#e2e5ec] flex justify-between items-center border-b-[length:var(--border-input)] cursor-pointer text-sm">
                    <span className={tw(spanClass, "w-[50%]", "pl-[40px]")}>Thời gian</span>
                    <span className={tw(spanClass, "w-[30%]")}>Số tiền</span>
                    <span className={tw(spanClass, "w-[20%]")}>Trạng thái</span>
                </div>
                <div>
                    {userWithdrawalHistory.map((item, index) => (
                        <WithdrawHistoryItem key={index} time={formatISODate(item.createdAt)} amount={String(item.volume)} status={item.status}/>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ProfileWithdrawHistory;