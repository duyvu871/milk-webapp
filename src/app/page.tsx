"use client";
import React, {useEffect, useLayoutEffect} from "react";
import Image from 'next/image'
import NormalField from "@/components/InputField/NormalField";
import PasswordField from "@/components/InputField/PasswordField";
import CheckBoxDefault from "@/components/InputField/Checkbox";
import ButtonDefault from "@/components/Button";
import Link from "next/link";
import { useRouter } from 'next/navigation';
// import useWindowDimensions from "@/hooks/useWindowDimensions";
import AppConfig from "@/configs/App.config";

export default function Home() {
    const { push } = useRouter();
    const [email, setEmail] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [isRemember, setIsRemember] = React.useState<boolean>(false);
    // const {width, height} = useWindowDimensions();

    const login = async function() {
        const requestBody = JSON.stringify({
            email,
            password,
            isRemember
        })
        await fetch(`/api/v1/auth/sign-in`, {
            method: "POST",
            body: requestBody,
            redirect: 'follow',
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if(res.status === 200){
                    localStorage.setItem("access_token", res.access_token);
                    localStorage.setItem("refresh_token", res.refresh_token);
                    push("/home");
                } else if (res.status === 400){
                    alert(res.message);
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    useLayoutEffect(() => {
        const access_token =  localStorage.getItem("access_token")
        if(!access_token){
            return;
        } else {
            const verifyToken = async function() {
                await fetch(`${AppConfig.mainApiUrl}/auth/profile`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        "x-access-token": `${access_token}`
                    }
                })
                    .then(res => res.json())
                    .then(res => {
                        console.log(res)
                        if(res.status === 200){
                            push("/home");
                        } else if (res.status === 400){
                            alert(res.message);
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        }
    }, []);

  return (
    <div className={"login-background w-full h-full flex justify-center items-start px-16"}>
        <div className={"flex flex-col justify-center items-center gap-4"}>
            <h1 className={"font-bold text-3xl text-white mt-32 mb-16"}>
                HANAMMILK
            </h1>
            <NormalField
                setFieldValue={(string) => {
                    setEmail(string);
                }}
                placeholder={"Email"}
                type={"text"}
                validate={(e) => {
                  return {
                    status: "ok",
                    message: "error"
                  }
                }}
            />
            <PasswordField
                setFieldValue={(string) => {
                    setPassword(string);
                }}
                placeholder={"Mật khẩu"}
                validate={(e) => {
                    return {
                        status: "oke",
                        message: "error"
                    }
                }}
            />
            <div className={" flex flex-col justify-start items-start"}>
                <CheckBoxDefault
                    setChecked={() => {
                        setIsRemember(!isRemember);
                    }}
                    content={"Ghi nhớ lần đăng nhập tiếp theo"}
                />
            </div>
            <div className={"flex flex-row justify-center items-center gap-4"}>
                <button onClick={() => {
                    login();
                }} className={"rounded-full bg-[#113b49] hover:bg-blue-600 px-16 py-3 font-bold text-white"}>
                        Đăng nhập
                </button>
            </div>
            <div className={"flex flex-row gap-2"}>
                <p>
                    Bạn chưa có tài khoản?
                </p>
                <Link href={"/register"} className={"text-blue-600 font-semibold underline"}>
                    Đăng kí
                </Link>
            </div>
        </div>
    </div>
  )
}

