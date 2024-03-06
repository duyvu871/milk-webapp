"use client";
import { useState } from "react";
import LoginForm from "@/components/Login/LoginForm";
import RegisterForm from "@/components/Register/RegisterForm";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";

const LoginMethod = {
    login: LoginForm,
    register: RegisterForm
}

export default function LoginPage({ error, callbackUrl}: { error?: string, callbackUrl?: string}) {
    const [currentMethod, setCurrentMethod ] = useState<"login"|"register">("login");
    const CurrentMethod = LoginMethod[currentMethod];
    return <CurrentMethod setCurrentMethod={setCurrentMethod}/>
}