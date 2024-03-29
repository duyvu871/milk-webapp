import React from "react";

export interface NormalFieldProps {
    setFieldValue: (value: string) => void;
    type?: string;
    placeholder?: string;
    validate?: {
        status: string;
        message: string;
    };
    className?: string;
    customChildren?: React.ReactNode;
}