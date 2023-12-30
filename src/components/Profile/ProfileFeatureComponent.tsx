import ProfileChangePassword from "@/components/Profile/ProfileChangePassword";
import ProfileTransactionHistory from "@/components/Profile/ProfileTransactionHistory";

import ProfileModalComponent from "@/components/Profile/ProfileModal";
import ProfileWithdrawHistory from "@/components/Profile/ProfileTransactionHistory/ProfileWithdrawHistory";
import ProfilePointFluctuation from "@/components/Profile/ProfilePointFluctuation";
import ProfileParticipationHistory from "@/components/Profile/ProfileParticipationHistory";
import ProfileSelectBanking from "@/components/Profile/ProfileSelectBanking";

export default function ProfileFeatureComponent({type, closeHandle}: {type: string; closeHandle: () => void}) {
    switch (type) {
        case "CHANGE_PASSWORD":
            return (
                <ProfileModalComponent closeHandler={closeHandle} content={<ProfileChangePassword closeModalHandle={closeHandle}/>} title={"Đổi mật khẩu"} />
            );
        case "TRANSACTION_HISTORY":
            return (
                <ProfileModalComponent closeHandler={closeHandle} content={<ProfileTransactionHistory />} title={"Lịch sử nạp"} />
            )
        case "WITHDRAW_HISTORY":
            return (
                <ProfileModalComponent closeHandler={closeHandle} content={<ProfileWithdrawHistory />} title={"Lịch sử rút"} />
            )
        case "POINT_FLUCTUATION":
            return (
                <ProfileModalComponent closeHandler={closeHandle} content={<ProfilePointFluctuation />} title={"Biến động số tiền"} />
            )
        case "PARTICIPATION_HISTORY":
            return (
                <ProfileModalComponent closeHandler={closeHandle} content={<ProfileParticipationHistory />} title={"Lịch sử tham gia"} />
            )
        case "BANKING":
            return (
                <ProfileModalComponent closeHandler={closeHandle} content={<ProfileSelectBanking />} title={"Ngân hàng"} />
            )
        // case "CHANGE_EMAIL":
        //     return <ProfileModalComponent type={"CHANGE_EMAIL"} />;
        // case "CHANGE_PHONE":
        //     return <ProfileModalComponent type={"CHANGE_PHONE"} />;
        // case "CHANGE_NAME":
        //     return <ProfileModalComponent type={"CHANGE_NAME"} />;
        default:
            return <> </>;
    }
}