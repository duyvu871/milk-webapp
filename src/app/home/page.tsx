import React from 'react';
import ScreenNavigate from '@/containers/Screen/ScreenNavigate'
import {getServerSession} from "next-auth";
import nextauthOptions from "@/lib/nextauthOptions";
import {redirect} from "next/navigation";
import MenuBar from "@/components/MenuBar";

interface PageProps {

};

async function Page({}: PageProps) {
    const session = await getServerSession(nextauthOptions);
    // console.log(session);
    if (!session) {
        return redirect("/");
    } else {
        return (
            <>
                <ScreenNavigate />
                <MenuBar />
            </>
        );
    }
}


export default Page;