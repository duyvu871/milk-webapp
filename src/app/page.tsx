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
import IntroductionFooter from "@/components/Introduction";

export default function Home() {
    const { push } = useRouter();
    const [username, setUsername] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [isRemember, setIsRemember] = React.useState<boolean>(false);
    // const {width, height} = useWindowDimensions();

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
        return userName.length > 0;
    }
    const sendLoginRequest = async function() {
        const requestBody = JSON.stringify({
            username,
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

    const login = async function() {
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
      <>
          <div className={"flex px-8 w-full h-full min-h-screen justify-center items-start bg-[-o-linear-gradient(112deg,rgba(255,255,255,0),#f3fcff,#179fd0),url(/images/san-pham-th-true-milk-1.jpg)] bg-[linear-gradient(178178deg,rgba(255,255,255,0),#f3fcff,#179fd0),url(/images/san-pham-th-true-milk-1.jpg)] bg-[right_center] bg-no-repeat bg-[auto_100%] "}>
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
                      }} className={"rounded-full bg-[#113b49] hover:opacity-70 px-16 py-2 font-semibold text-xl text-white w-full"}>
                          Đăng Nhập Ngay
                      </button>
                  </div>
                  <div className={"flex flex-row justify-center items-center gap-2 font-bold"}>
                      <p className={"text-md"}>
                          Bạn chưa có tài khoản? 👉
                      </p>
                      <Link href={"/register"} className={"text-md text-blue-600 font-semibold underline"}>
                          Đăng kí tài khoản mới
                      </Link>
                  </div>
              </div>
          </div>
          {/*<IntroductionFooter/>*/}
      </>
  )
}

