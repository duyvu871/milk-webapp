"use client";

import React, {useEffect} from "react";
import {tw} from "@/ultis/tailwind.ultis";
import {NormalFieldProps} from "@/components/InputField/InputType";

export default function NormalField({
setFieldValue, placeholder, validate, customChildren, type, className
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
        <div className={tw("flex flex-col justify-center items-center  w-full text-black", className||"")}>
            <div className={"rounded-full bg-white p-3 px-6 w-full flex flex-row"}>
                <input
                    autoCorrect="off"
                    autoCapitalize="none"
                    spellCheck="false"
                    autoComplete="off"
                    autoSave="off"
                    autoFocus={false}
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