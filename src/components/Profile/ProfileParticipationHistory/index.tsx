import React from 'react';
import {tw} from "@/ultis/tailwind.ultis";

interface ProfileParticipationHistoryProps {

};

function ProfileParticipationHistory({}: ProfileParticipationHistoryProps) {
    const spanClass = 'text-left py-2 px-1';

    return (
        <div>
            <div className="flex justify-between items-center mb-2.5 px-[5px] py-2.5 rounded-[5px] bg-[#113b49]" >
                <div className="text-white" >
                    <span>Tổng số đơn:</span> <b>0</b>
                </div>
                <div className="text-white" >
                    <span>Tổng thưởng:</span> <b>0</b>
                </div>
            </div>
            <div className="historyBet__items" >
                <div className="rounded-[5px] bg-[#e2e5ec] flex justify-between items-center border-b-[length:var(--border-input)] cursor-pointer">
                    <span className={tw(spanClass, "w-[50%]")}>Số đơn</span>
                    <span className={tw(spanClass, "w-[30%]")}>Tổng tiền</span>
                    <span className={tw(spanClass, "w-[20%]")}>Tổng thưởng</span>
                </div>
            </div>
            <div>

            </div>
        </div>
    );
}

export default ProfileParticipationHistory;