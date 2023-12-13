import React, {useEffect} from "react";
import {tw} from "@/ultis/tailwind.ultis";
import {NormalFieldProps} from "@/components/InputField/InputType";

export default function NormalField({
setFieldValue, placeholder, validate, customChildren, type
}: NormalFieldProps) {
    const [value, setValue] = React.useState<string>("");
    const [isAlert, setIsAlert] = React.useState<boolean>(false);
    const [alertMessage, setAlertMessage] = React.useState<string>("");

    useEffect(() => {
        const validateResult = validate?.(value);
        if (validateResult?.status === "error") {
            setIsAlert(true);
            setAlertMessage(validateResult.message);
        } else {
            setIsAlert(false);
            setAlertMessage("");
        }
    }, [value]);

    return (
        <div className={"flex flex-col justify-start  w-full text-black"}>
            <div className={"rounded-full bg-white p-2 w-full flex flex-row"}>
                <input
                    onChange={(e) => {
                        setValue(e.target.value);
                        setFieldValue(e.target.value);
                    }}
                    placeholder={placeholder}
                    className={tw(
                        "w-full outline-none text-black",
                        "text-md font-bold",
                        isAlert ? "border-2 border-red-500 text-red-500" : ""
                    )}
                    type={type || "text"}
                />
                {customChildren}
            </div>
            <span className={"text-red-500 text-xs"}>{alertMessage}</span>
        </div>
    )
}