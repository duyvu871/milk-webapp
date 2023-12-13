import React from "react";

export interface NormalFieldProps {
    setFieldValue: (value: string) => void;
    type?: string;
    placeholder?: string;
    validate?: (value: string) => {
        status: string;
        message: string;
    };
    customChildren?: React.ReactNode;
}