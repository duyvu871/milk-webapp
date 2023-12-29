import React, {useEffect, useState} from "react";
import { useRouter } from "next/navigation";
import AppConfig from "@/configs/App.config";

export default function useAuth() {
    const { push } = useRouter();
    const [isValid, setIsValid] = useState<boolean>(false);
    const [userData, setUserData] = React.useState<any>(null);

    const update: Record<any, any> = {};

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



    useEffect(() => {
        const access_token =  localStorage.getItem("access_token")
        if(!access_token){
        return push("/");
        } else {
        const verifyToken = async function() {
            return await fetch(`/api/v1/auth/validateUser`, {
            method: "POST",
            // cache: "force-cache",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": access_token
            },
            body: JSON.stringify({
                access_token: access_token
            }),
            })
                .then(res => res.json())
                .then(res => {
                if(res.status === 200) setUserData(res.data.user);
                else {
                    alert("not validate user")
                    push("/");
                }
                }).catch(err => {console.log(err)})
        }
        verifyToken();
        }
    }, []);

    return { userData, update };
}