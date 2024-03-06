import React from 'react';

interface ProfilePointFluctuationProps {

};

function ProfilePointFluctuation({}: ProfilePointFluctuationProps) {
    return (
        <div>
            <div className="flex justify-between items-center mb-2.5 px-[5px] py-2.5 rounded-[5px] bg-[#113b49] text-sm" >
                <div className="text-white" >
                    <span>Tổng số GD:</span> <b>0</b>
                </div>
            </div>
            <div>

            </div>
        </div>
    );
}

export default ProfilePointFluctuation;