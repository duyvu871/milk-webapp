import React, {useContext, useEffect, useState} from "react";
import {tw} from "@/ultis/tailwind.ultis";
// import {FaEyeSlash} from "react-icons/fa";
// import {FaEye} from "react-icons/fa6";
// import {NormalFieldProps} from "@/components/InputField/InputType";
import PasswordField from "@/components/InputField/PasswordField";
import {useToast} from "@/hooks/useToast";
import store from "@/redux/store";
import {UserDataContext} from "@/contexts/UserDataContext";
import {hideProfileScreen} from "@/redux/action/showPopup";
import RotationLoading from "@/components/Loading/RotationLoading";
// import {hideModal} from "@/redux/action/showPopup";
import { timeout } from "@/helper/delayAction";

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


export default function ProfileChangePassword({ }: {}) {
    const { error: showError, success: showSuccess } = useToast();
    const {updatePassword} = useContext(UserDataContext);
    const {dispatch} = store;

    const [isFirstTimeSubmit, setIsFirstTimeSubmit] = useState<boolean>(true);

    const [oldPassword, setOldPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    // const [confirm, setConfirm] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const oldPasswordErrorRef = React.useRef<HTMLSpanElement>(null);
    const newPasswordErrorRef = React.useRef<HTMLSpanElement>(null);
    const confirmedPasswordErrorRef = React.useRef<HTMLSpanElement>(null);

    const validatePasswords = (): boolean => {
        if (isFirstTimeSubmit) {
            return true;
        }
        let isValid = true;

        if (oldPasswordErrorRef.current) {
            if (oldPassword === "") {
                oldPasswordErrorRef.current.innerText = "Vui lòng nhập mật khẩu cũ";
                isValid = false;
            } else {
                oldPasswordErrorRef.current.innerText = "";
            }
        }

        const fieldsToCheck = [
            { field: newPassword, errorRef: newPasswordErrorRef, errorMessage: "Vui lòng nhập mật khẩu mới" },
            { field: confirmPassword, errorRef: confirmedPasswordErrorRef, errorMessage: "Vui lòng xác nhận mật khẩu" },
        ];

        for (const { field, errorRef, errorMessage } of fieldsToCheck) {
            if (errorRef.current) {
                if (field === "") {
                    errorRef.current.innerText = errorMessage;
                    isValid = false;
                } else {
                    errorRef.current.innerText = "";
                }
            }
        }

        if (confirmedPasswordErrorRef.current) {
            if (newPassword !== confirmPassword) {
                confirmedPasswordErrorRef.current.innerText = "Mật khẩu xác nhận không trùng khớp";
                isValid = false;
            } else {
                confirmedPasswordErrorRef.current.innerText = "";
            }
        }
        return isValid;
    };

    const handleUpdatePassword = async (e: React.MouseEvent) => {
        const isValidPassword = validatePasswords();
        setIsFirstTimeSubmit(false);
        if (!isValidPassword) {
            return;
        }
        setLoading(true);
        try {
            const res = await updatePassword(oldPassword, newPassword);
            // console.log(res)
            if (res.status === 200) {
                timeout(2000).then(() => {
                    setLoading(false);
                    showSuccess(res.message);
                })
            } else {
                timeout(2000).then(() => {
                    setLoading(false);
                    showError(res.message);
                });
            }
        } catch (e: any) {
            setError(e.message);
            setLoading(false);
        }
    }

    const handleInput = (dispatchEvent: React.Dispatch<React.SetStateAction<string>>) => {
        validatePasswords();
        return (value: string) => {
            dispatchEvent(value);
        }
    }

    useEffect(() => {

    }, [oldPassword, newPassword, confirmPassword]);

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
                        className={"border-gray-300 border-[1px] rounded-[5px]"}
                        setFieldValue={handleInput(setOldPassword)}
                        placeholder={""}
                        validate={{
                            status: "SUCCESS",
                            message: ""
                        }}
                        customChildren={null}
                    />
                    <span className={"text-red-500 text-xs italic"} ref={oldPasswordErrorRef}></span>
                </div>
                <div className={"w-full"}>
                    <span className={"mb-1"}>
                        Mật khẩu mới:
                    </span>
                    <PasswordField
                        className={"border-gray-300 border-[1px] rounded-[5px]"}
                        setFieldValue={handleInput(setNewPassword)}
                        placeholder={""}
                        validate={{
                            status: "SUCCESS",
                            message: ""
                        }}
                        customChildren={null}
                    />
                    <span className={"text-red-500 text-xs italic"} ref={newPasswordErrorRef}></span>
                </div>
                <div className={"w-full"}>
                    <span className={"mb-1"}>
                        Xác nhận mật khẩu mới:
                    </span>
                    <PasswordField
                        className={"border-gray-300 border-[1px] rounded-[5px]"}
                        setFieldValue={handleInput(setConfirmPassword)}
                        placeholder={""}
                        validate={{
                            status: "SUCCESS",
                            message: ""
                        }}
                        customChildren={null}
                    />
                    <span className={"text-red-500 text-xs italic"} ref={confirmedPasswordErrorRef}></span>
                </div>
                <div className="flex flex-row justify-end items-center w-full">
                    <button className={"bg-[#e2e5ec] text-sm uppercase font-semibold cursor-pointer mx-[5px] my-0 px-[15px] py-2.5 rounded-[5px] border-[none]"} onClick={() => {
                        dispatch(hideProfileScreen());
                    }}>
                        Hủy
                    </button>
                    <button
                        className={"flex flex-row justify-center items-center gap-3 bg-[#113b49] text-white text-sm uppercase font-semibold cursor-pointer mx-[5px] my-0 px-[15px] py-2.5 rounded-[5px] border-[none]"}
                        onClick={handleUpdatePassword}
                        disabled={loading}
                    >
                        {loading ? <RotationLoading height={30} width={30}/> : <></>}
                        Xác nhận
                    </button>
                </div>
            </div>
        </div>
    )
}
