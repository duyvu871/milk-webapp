import React, {useEffect, useLayoutEffect, useState} from "react";
import {useRouter} from "next/navigation";
import AppConfig from "@/configs/App.config";

export default function useAuth() {
    const { push } = useRouter();
    const [isValid, setIsValid] = useState<boolean>(false);
    const [userData, setUserData] = React.useState<any>(null);
    const [userBalance, setUserBalance] = React.useState<number>(0);

    const update: Record<string,  (...props:any) => Promise<void>> = {};
    const userDetail: Record<string, (...props:any) => Promise<void>> = {};

    update.updatePassword = async function (access_token: string, password: string, username: string) {
        const response = await fetch(`${AppConfig.mainApiUrl}/auth/update/update-password`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": access_token
            },
            body: JSON.stringify({
                // refresh_token: refresh_token,
                updatedPassword: password,
                // username: username
            }),
        });
    }

    update.updateBankingMethod = async function ({bankName, accountNumber, accountName} : Record<string, string>, access_token: string) {
        const response = await fetch(`${AppConfig.mainApiUrl}/auth/update/update-banking-method`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": access_token
            },
            body: JSON.stringify({
                bankName: bankName,
                accountNumber: accountNumber,
                accountName: accountName
            }),
        });

    }

    userDetail.getUserDetail = async function (access_token: string, username: string) {
        const response = await fetch(`${AppConfig.mainApiUrl}/auth/get-user-detail`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": access_token
            },
            body: JSON.stringify({
                // refresh_token: refresh_token,
                // username: username
            }),
        });
        return await response.json();
    }

    useLayoutEffect(() => {
        localStorage.getItem("token") && setIsValid(true);
    }, []);

    return {isValid, userData, update, userBalance};
}