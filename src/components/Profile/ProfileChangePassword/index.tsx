import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {tw} from "@/ultis/tailwind.ultis";
import useAuth from "@/hooks/useAuth";
// import NormalField from "@/components/InputField/NormalField";
import {FaEyeSlash} from "react-icons/fa";
import {FaEye} from "react-icons/fa6";
import {NormalFieldProps} from "@/components/InputField/InputType";

const ContractField = ({
    setValue, label, placeholder, type, className, wrapperStyle, props
} : {
    // contract: any;
    setValue: (e: React.MouseEvent) => void;
    label: string;
    placeholder?: string;
    type: "text" | "number" | "password";
    className?: string;
    wrapperStyle?: string;
    props?: any;
}) => {
    return (
        <div className={tw(
            "flex flex-col justify-start items-start p-2 w-full",
            wrapperStyle || ""
        )}>
            <span className={"text-sm font-semibold"}>
                {label}
            </span>
            <input
                className={tw(
                    "my-2 w-full rounded-sm p-2 outline-none border-[1px] border-gray-400 text-sm white-glassmorphism",
                    "rounded-lg",
                    className || ""
                )}
                onChange={setValue}
                placeholder={placeholder}
                type={type}
                {...props}
            />
        </div>
    );
}

const ContractCheckbox = ({
    setConfirm, label, className, wrapperStyle, props
} : {
    setConfirm: (value: boolean) => void;
    label: string;
    className?: string;
    wrapperStyle?: string;
    props?: any;
}) => {
    return (
        <div className={tw(
            "flex flex-row justify-start items-center text-xs ",
            wrapperStyle || ""
        )}>
            <input
                type="checkbox"
                onChange={(e) => setConfirm(e.target.checked)}
                className={tw(
                    "mr-2",
                    className || ""
                )}
                {...props}
            />
            <label>{label}</label>
        </div>
    );
}

function NormalField({
setFieldValue, placeholder, validate, customChildren, type
}: NormalFieldProps) {
    const [value, setValue] = React.useState<string>("");
    const [isAlert, setIsAlert] = React.useState<boolean>(false);
    const [alertMessage, setAlertMessage] = React.useState<string>("");

    useEffect(() => {
        const validateResult = validate;
        if (validateResult?.status === "ALERT") {
            setIsAlert(true);
            setAlertMessage(validateResult.message);
        } else if (validateResult?.status === "SUCCESS") {
            setIsAlert(false);
            setAlertMessage("");
        }
    }, [validate]);

    return (
        <div className={"flex flex-col justify-center items-center  w-full text-black border-gray-200 border-[1px] rounded-[5px]"}>
            <div className={"rounded-full bg-white p-[6px] px-6 w-full flex flex-row"}>
                <input
                    onChange={(e) => {
                        setValue(e.target.value);
                        setFieldValue(e.target.value);
                    }}
                    placeholder={placeholder}
                    className={tw(
                        "w-full outline-none text-black",
                        "text-md ",
                        isAlert ? "text-red-500 italic" : ""
                    )}
                    type={type || "text"}
                />
                {customChildren}
            </div>
            <span className={"text-red-500 text-xs italic"}>{alertMessage}</span>
        </div>
    )
}

function PasswordField({
setFieldValue, placeholder, validate, customChildren
}: NormalFieldProps) {
    const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

    return (
        <NormalField
            setFieldValue={setFieldValue}
            placeholder={placeholder}
            validate={validate}
            type={isShowPassword ? "text" : "password"}
            customChildren={
                <div className={"flex flex-row justify-center items-center"} onClick={() => {
                    setIsShowPassword(!isShowPassword);
                }}>
                    {isShowPassword ? <FaEyeSlash size={16} className={"opacity-40"}/> : <FaEye size={16} className={"opacity-40"} />}
                </div>
            }
        />
    )
}

export default function ProfileChangePassword({ closeModalHandle }: { closeModalHandle: (value: boolean) => void }) {
    const [oldPassword, setOldPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [confirm, setConfirm] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const router = useRouter();
    const {update} = useAuth();

    const handleUpdatePassword = async (e: React.MouseEvent) => {
        // e.preventDefault();
        // if (newPassword !== oldPassword) {
        //     setError("New password and confirm password must be the same");
        //     return;
        // }
        // if (!confirm) {
        //     setError("Please confirm your password");
        //     return;
        // }
        // if (newPassword.length < 8) {
        //     setError("Password must be at least 8 characters");
        //     return;
        // }
        setLoading(true);
        try {
            const access_token = localStorage.getItem("access_token");
            await update.updatePassword(access_token, newPassword);
            setSuccess("Update password successfully");
            alert("Thay đổi mật khẩu thành công");
            setLoading(false);
            setTimeout(() => {
                setSuccess("");
                // router.push("/profile");
                // alert("Update password successfully");
            }, 2000);
        } catch (e: any) {
            setError(e.message);
            setLoading(false);

        }
    }

    return (
        <div className={tw(
            "flex flex-col justify-start items-start w-full",
            " md:p-4 lg:p-6",
            "bg-white-glassmorphism rounded-lg"
        )}>
            <span>
                {success ? success : error}
            </span>
            <div className={tw(
                "flex flex-col justify-start items-start w-full gap-4",
                "mt-2 md:mt-4 lg:mt-6"
            )}>
                <div className={"w-full"}>
                    <span className={"pb-4"}>
                        Mật khẩu cũ:
                    </span>
                    <PasswordField
                        setFieldValue={setOldPassword}
                        placeholder={""}
                        validate={{
                            status: "SUCCESS",
                            message: ""
                        }}
                        customChildren={null}
                    />
                </div>
                <div className={"w-full"}>
                    <span className={"mb-1"}>
                        Mật khẩu mới:
                    </span>
                    <PasswordField
                        setFieldValue={setNewPassword}
                        placeholder={""}
                        validate={{
                            status: "SUCCESS",
                            message: ""
                        }}
                        customChildren={null}
                    />
                </div>
                <div className={"w-full"}>
                    <span className={"mb-1"}>
                        Xác nhận mật khẩu mới:
                    </span>
                    <PasswordField
                        setFieldValue={setConfirmPassword}
                        placeholder={""}
                        validate={{
                            status: "SUCCESS",
                            message: ""
                        }}
                        customChildren={null}
                    />
                </div>
                <div className="flex flex-row justify-end items-center w-full">
                    <button className={"bg-[#e2e5ec] text-sm uppercase font-semibold cursor-pointer mx-[5px] my-0 px-[15px] py-2.5 rounded-[5px] border-[none]"} onClick={() => {
                        closeModalHandle(false);
                    }}>
                        Hủy
                    </button>
                    <button className={"bg-[#113b49] text-white text-sm uppercase font-semibold cursor-pointer mx-[5px] my-0 px-[15px] py-2.5 rounded-[5px] border-[none]"} onClick={handleUpdatePassword}>Xác
                        nhận
                    </button>
                </div>
            </div>
        </div>
    )
}
