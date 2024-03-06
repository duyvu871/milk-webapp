// "use client"
import React from "react";
import LoginPage from "@/containers/LoginPage";
import {redirect} from "next/navigation";
import {getServerSession} from "next-auth";
import nextauthOptions from "@/lib/nextauthOptions";

export default async function Home() {
  const session = await getServerSession(nextauthOptions);
  if (session) {
    return redirect("/home");
  } else {
    return (
        <LoginPage />
    );
  }
}


