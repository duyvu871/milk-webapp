import React from 'react';
import NormalField from "@/components/InputField/NormalField";
import PasswordField from "@/components/InputField/PasswordField";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {  } from "next-auth/react";

interface RegisterFormProps {
    setCurrentMethod: React.Dispatch<React.SetStateAction<"login" | "register">>;
};

function RegisterForm({setCurrentMethod}: RegisterFormProps) {
    const { push } = useRouter();
    const [email, setEmail] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [confirmPassword, setConfirmPassword] = React.useState<string>("");
    const [phoneNumber, setPhoneNumber] = React.useState<string>("");
    const [userName, setUserName] = React.useState<string>("");
    const [passwordAlert, setPasswordAlert] = React.useState<{status: "ALERT" | "SUCCESS"; message: string}>({
        status: "SUCCESS",
        message: ""
    });
    const [usernameAlert, setUserNameAlert] = React.useState<{status: "ALERT" | "SUCCESS"; message: string}>({
        status: "SUCCESS",
        message: ""
    });

    const validatePassword = (password: string, confirmPassword: string): boolean => {
        return password === confirmPassword;
    }

    const userNameValidate = (userName: string): boolean => {
        return userName.length > 8;
    }

    const sendSignUpRequest = async function() {
        const requestBody = {
            email,
            password,
            phone: phoneNumber,
            username: userName,
        }

        const res = await fetch("/api/v1/auth/sign-up", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody)
        });

        if (res.status === 200) {
            alert("Đăng kí thành công");
            setCurrentMethod("login");
        } else {
            alert("Đăng kí thất bại");
        }
    }

    const signUp = async function() {
        let isValidated = true;
        if (!validatePassword(password, confirmPassword)) {
            isValidated = false;
            setPasswordAlert({
                status: "ALERT",
                message: "Mật khẩu không trùng khớp"
            })
        }
        if (!userNameValidate(userName)) {
            isValidated = false;
            setUserNameAlert({
                status: "ALERT",
                message: "Tên đăng nhập phải lớn hơn 8 ký tự"
            })
        }

        if (isValidated) {
            await sendSignUpRequest();
        }
    }


    return (
        <div
            className={"flex px-8 w-full h-full min-h-screen justify-center items-start bg-[-o-linear-gradient(112deg,rgba(255,255,255,0),#f3fcff,#179fd0),url(/images/san-pham-th-true-milk-1.jpg)] bg-[linear-gradient(178178deg,rgba(255,255,255,0),#f3fcff,#179fd0),url(/images/san-pham-th-true-milk-1.jpg)] bg-[right_center] bg-no-repeat bg-[auto_100%] "}>
            {/*<Image src={"/banner.jpg"} width={1000}height={1000} objectFit={"cover"}/>*/}
            <div className={"flex flex-col justify-center items-center gap-3 w-full"}>
                <h1 className={"text-5xl text-[#113b49] mt-16 mb-16"}>
                    HANAMMILK
                </h1>
                <NormalField
                    setFieldValue={(string) => {
                        setUserName(string);
                    }}
                    placeholder={"Tên đăng nhập"}
                    validate={usernameAlert}
                />
                <div className={"mt-1"}></div>
                {/*<NormalField*/}
                {/*    setFieldValue={(string) => {*/}
                {/*        setPhoneNumber(string);*/}
                {/*    }}*/}
                {/*    placeholder={"Số điện thoại"}*/}
                {/*    validate={(e) => {*/}
                {/*        return {*/}
                {/*            status: "oke",*/}
                {/*            message: "error"*/}
                {/*        }*/}
                {/*    }}*/}
                {/*/>*/}
                {/*<NormalField*/}
                {/*    setFieldValue={(string) => {*/}
                {/*        setEmail(string);*/}
                {/*    }}*/}
                {/*    placeholder={"Email"}*/}
                {/*    type={"text"}*/}
                {/*    validate={(e) => {*/}
                {/*        return {*/}
                {/*            status: "ok",*/}
                {/*            message: "error"*/}
                {/*        }*/}
                {/*    }}*/}
                {/*/>*/}
                <PasswordField
                    setFieldValue={(string) => {
                        setPassword(string);
                        setPasswordAlert({
                            status: "SUCCESS",
                            message: ""
                        });
                    }}
                    placeholder={"Mật khẩu"}
                    validate={passwordAlert}
                />
                <div className={"mt-1"}></div>
                <PasswordField
                    setFieldValue={(string) => {
                        setConfirmPassword(string);
                        setPasswordAlert({
                            status: "SUCCESS",
                            message: ""
                        });
                    }}
                    placeholder={"Xác nhận mật khẩu"}
                    validate={passwordAlert}
                />
                <div className={"mt-1"}></div>
                {/*<div className={"flex flex-col justify-start items-start"}>*/}
                {/*    <CheckBoxDefault*/}
                {/*        setChecked={() => {}}*/}
                {/*        content={"Ghi nhớ lần đăng nhập tiếp theo"}*/}
                {/*    />*/}
                {/*</div>*/}
                <div className={"flex flex-row justify-center items-center gap-4 w-full"}>
                    <button onClick={() => {
                        signUp();
                    }}
                            className={"rounded-full bg-[#113b49] hover:opacity-70 px-16 py-2 font-semibold text-xl text-white w-full"}>
                        Đăng kí ngay
                    </button>
                </div>
                <div className={"mt-1"}></div>

                <div className={"flex flex-row justify-center items-center gap-2 font-bold"}>
                    <p className={"text-md"}>
                        Bạn đã có tài khoản? 👉
                    </p>
                    <div onClick={() => {setCurrentMethod("login")}} className={"cursor-pointer text-md text-blue-600 font-semibold underline"}>
                        Đăng nhập Ngay
                    </div>
                </div>
            </div>

        </div>

    );
}

export default RegisterForm;