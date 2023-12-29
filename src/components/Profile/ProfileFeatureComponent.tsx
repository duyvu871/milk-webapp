import ProfileChangePassword from "@/components/Profile/ProfileChangePassword";

import ProfileModalComponent from "@/components/Profile/ProfileModal";

export default function ProfileFeatureComponent({type, closeHandle}: {type: string; closeHandle: () => void}) {
    switch (type) {
        case "CHANGE_PASSWORD":
            return (
                <ProfileModalComponent closeHandler={closeHandle} content={<ProfileChangePassword closeModalHandle={closeHandle}/>} title={"Đổi mật khẩu"} />
            );
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