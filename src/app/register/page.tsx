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
export default function Home() {
    const { push } = useRouter();
    const [email, setEmail] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");

    return (
        <div className={"login-background w-full h-full flex justify-center items-start px-16"}>
            {/*<Image src={"/banner.jpg"} width={1000}height={1000} objectFit={"cover"}/>*/}
            <div className={"flex flex-col justify-center items-center gap-4"}>
                <h1 className={"font-bold text-3xl text-white mt-32 mb-16"}>
                    AFamily
                </h1>
                <NormalField
                    setFieldValue={(string) => {
                        setPassword(string);
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
                        setPassword(string);
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
                        push("/")
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
    )
}
