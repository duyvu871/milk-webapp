import React, {useCallback, useLayoutEffect} from 'react';
import NormalField from "@/components/InputField/NormalField";
import PasswordField from "@/components/InputField/PasswordField";
import CheckBoxDefault from "@/components/InputField/Checkbox";
import {useRouter} from "next/navigation";
import AppConfig from "@/configs/App.config";
import { signIn } from "next-auth/react";
import { useToast } from "@/hooks/useToast";

interface LoginFormProps {
    setCurrentMethod: React.Dispatch<React.SetStateAction<"login" | "register">>;
};

function LoginForm({setCurrentMethod}: LoginFormProps) {
    const {error, success} = useToast();
    const { push } = useRouter();
    const [username, setUsername] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [isRemember, setIsRemember] = React.useState<boolean>(false);

    const [passwordAlert, setPasswordAlert] = React.useState<{status: "ALERT" | "SUCCESS"; message: string}>({
        status: "SUCCESS",
        message: ""
    });
    const [usernameAlert, setUserNameAlert] = React.useState<{status: "ALERT" | "SUCCESS"; message: string}>({
        status: "SUCCESS",
        message: ""
    });
    const userNameValidate = (userName: string): boolean => {
        return userName.length > 0;
    }
    const sendLoginRequest = async () => {
        const res = await signIn("credentials", {
            username,
            password,
            redirect: false,
        })
        // console.log(res)
        if(res?.error) {
            error("Đăng nhập thất bại");
        } else {
            push("/home");
        }
    }

    const login = useCallback(async function() {
            let isValidated = true;
            if (!userNameValidate(password)) {
                isValidated = false;
                setPasswordAlert({
                    status: "ALERT",
                    message: "Mật khẩu không trùng khớp"
                })
            }
            if (!userNameValidate(username)) {
                isValidated = false;
                setUserNameAlert({
                    status: "ALERT",
                    message: "Tên đăng nhập phải lớn hơn 8 ký tự"
                })
            }

            if (isValidated) {
                await sendLoginRequest();
            }
        }, [username, password, isRemember]);

    return (
        <div
            className={"flex px-8 w-full h-full min-h-screen justify-center items-start bg-[-o-linear-gradient(112deg,rgba(255,255,255,0),#f3fcff,#179fd0),url(/images/san-pham-th-true-milk-1.jpg)] bg-[linear-gradient(178178deg,rgba(255,255,255,0),#f3fcff,#179fd0),url(/images/san-pham-th-true-milk-1.jpg)] bg-[right_center] bg-no-repeat bg-[auto_100%] "}>
            <div className={"flex flex-col justify-center items-center gap-3 w-full"}>
                <h1 className={"text-5xl text-[#113b49] mt-16 mb-16"}>
                    HANAMMILK
                </h1>
                <NormalField
                    setFieldValue={(string) => {
                        setUsername(string);
                    }}
                    placeholder={"Tên đăng nhập"}
                    type={"text"}
                    validate={{
                        status: "SUCCESS",
                        message: "error"
                    }}
                />
                <div className={"mt-1"}></div>
                <PasswordField
                    setFieldValue={(string) => {
                        setPassword(string);
                    }}
                    placeholder={"Mật khẩu"}
                    validate={{
                        status: "SUCCESS",
                        message: "error"
                    }}

                />
                <div className={"my-4 flex flex-col justify-start items-start w-full"}>
                    <CheckBoxDefault
                        setChecked={() => {
                            setIsRemember(!isRemember);
                        }}
                        content={"Duy trì đăng nhập"}
                    />
                </div>
                <div className={"flex flex-row justify-center items-center gap-4 w-full"}>
                    <button onClick={() => {
                        login();
                    }}
                            className={"rounded-full bg-[#113b49] hover:opacity-70 px-16 py-2 font-semibold text-xl text-white w-full"}>
                        Đăng Nhập Ngay
                    </button>
                </div>
                <div className={"flex flex-row justify-center items-center gap-2 font-bold"}>
                    <p className={"text-md"}>
                        Bạn chưa có tài khoản? 👉
                    </p>
                    <div className={"text-md text-blue-600 font-semibold underline cursor-pointer"} onClick={() => {setCurrentMethod("register")}}>
                        Đăng kí tài khoản mới
                    </div>
                </div>
            </div>
        </div>

    );
}

export default LoginForm;