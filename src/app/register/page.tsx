"use client";
import React from "react";
import Image from 'next/image'
import NormalField from "@/components/InputField/NormalField";
import PasswordField from "@/components/InputField/PasswordField";
import CheckBoxDefault from "@/components/InputField/Checkbox";
import ButtonDefault from "@/components/Button";
import Link from "next/link";
// import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation';
import IntroductionFooter from "@/components/Introduction";
export default function Home() {
    const { push } = useRouter();
    const [email, setEmail] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [phoneNumber, setPhoneNumber] = React.useState<string>("");
    const [userName, setUserName] = React.useState<string>("");

    const signUp = async function() {
        const requestBody = {
            email,
            password,
            phone: phoneNumber,
            username: userName
        }
        await fetch(`/api/v1/auth/sign-up`, {
            method: "POST",
            body: JSON.stringify(requestBody),
            redirect: 'follow',
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if(res.status === 200){
                    push("/");
                } else if (res.status === 400){
                    alert(res.message);
                }
            })
            .catch(err => {
                console.log(err)
            })
    }


    return (
        <>
            <div className={"login-background w-full h-full flex justify-center items-start px-16"}>
                {/*<Image src={"/banner.jpg"} width={1000}height={1000} objectFit={"cover"}/>*/}
                <div className={"flex flex-col justify-center items-center gap-4"}>
                    <h1 className={"font-bold text-3xl text-white mt-32 mb-16"}>
                        AFamily
                    </h1>
                    <NormalField
                        setFieldValue={(string) => {
                            setUserName(string);
                        }}
                        placeholder={"Họ tên"}
                        validate={(e) => {
                            return {
                                status: "oke",
                                message: "error"
                            }
                        }}
                    />
                    <NormalField
                        setFieldValue={(string) => {
                            setPhoneNumber(string);
                        }}
                        placeholder={"Số điện thoại"}
                        validate={(e) => {
                            return {
                                status: "oke",
                                message: "error"
                            }
                        }}
                    />
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

                    {/*<div className={" flex flex-col justify-start items-start"}>*/}
                    {/*    <CheckBoxDefault*/}
                    {/*        setChecked={() => {}}*/}
                    {/*        content={"Ghi nhớ lần đăng nhập tiếp theo"}*/}
                    {/*    />*/}
                    {/*</div>*/}
                    <div className={"flex flex-row justify-center items-center gap-4"}>
                        <button onClick={() => {
                            signUp();
                        }} className={"rounded-full bg-[#113b49] hover:bg-blue-600 px-16 py-3 font-bold text-white"}>
                            Đăng kí
                        </button>
                    </div>
                    <div className={"flex flex-row gap-2"}>
                        <p>
                            Bạn đã có tài khoản?
                        </p>
                        <Link href={"/"} className={"text-blue-600 font-semibold underline"}>
                            Đăng nhập
                        </Link>
                    </div>
                </div>

            </div>

            <IntroductionFooter/>
        </>
    )
}
