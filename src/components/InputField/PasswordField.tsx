import React, { useState } from "react";
import NormalField from "@/components/InputField/NormalField";
import {NormalFieldProps} from "@/components/InputField/InputType";

// import icons
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa";

interface PasswordFieldProps extends NormalFieldProps {

}
export default function PasswordField({
    setFieldValue, placeholder, validate, customChildren, className
}: PasswordFieldProps) {
    const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

    return (
        <NormalField
            className={className}
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