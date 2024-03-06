import ProfileChangePassword from "@/components/Profile/ProfileChangePassword";
import ProfileTransactionHistory from "@/components/Profile/ProfileTransactionHistory";
import ProfileModalComponent from "@/components/Profile/ProfileModal";
import ProfileWithdrawHistory from "@/components/Profile/ProfileTransactionHistory/ProfileWithdrawHistory";
import ProfilePointFluctuation from "@/components/Profile/ProfilePointFluctuation";
import ProfileParticipationHistory from "@/components/Profile/ProfileParticipationHistory";
import ProfileSelectBanking from "@/components/Profile/ProfileSelectBanking";
import ProfileWithdrawAction from "@/components/Profile/ProfileWithdrawAction";

export default function ProfileFeatureComponent({type}: {type: string}) {
    switch (type) {
        case "CHANGE_PASSWORD":
            return (
                <ProfileModalComponent content={<ProfileChangePassword />} title={"Đổi mật khẩu"} />
            );
        case "TRANSACTION_HISTORY":
            return (
                <ProfileModalComponent content={<ProfileTransactionHistory />} title={"Lịch sử nạp"} />
            )
        case "WITHDRAW_HISTORY":
            return (
                <ProfileModalComponent content={<ProfileWithdrawHistory />} title={"Lịch sử rút"} />
            )
        case "POINT_FLUCTUATION":
            return (
                <ProfileModalComponent content={<ProfilePointFluctuation />} title={"Biến động số tiền"} />
            )
        case "PARTICIPATION_HISTORY":
            return (
                <ProfileModalComponent content={<ProfileParticipationHistory />} title={"Lịch sử tham gia"} />
            )
        case "BANKING":
            return (
                <ProfileModalComponent content={<ProfileSelectBanking />} title={"Ngân hàng"} />
            )
        case "PROFILE_WITHDRAW_ACTION":
            return (
                <ProfileModalComponent content={<ProfileWithdrawAction />} title={"Rút Điểm"} />
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