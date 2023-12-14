import React from "react";

interface CheckBoxProps {
    setChecked: (value: boolean) => void;
    content: React.ReactNode;
}

export default function CheckBoxDefault({setChecked, content}: CheckBoxProps) {
    return (
        <div className={"flex flex-row items-center justify-start"}>
            <input
                type="checkbox"
                className={"mr-2"}
                onChange={(e) => {
                    setChecked(e.target.checked);
                }}
            />
            <p className={"text-sm"}>
                {content}
            </p>
        </div>
    )
}