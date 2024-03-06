"use client";
import React from 'react';
import { useSession } from 'next-auth/react';
import { signOut } from "next-auth/react";
import {useRouter} from "next/navigation";

interface AdminDashboardScreenProps {
    
};

function AdminDashboardScreen({}: AdminDashboardScreenProps) {
    const { data: session, status } = useSession();
    const { push } = useRouter();
    if (status === "unauthenticated") push("/");
    return (
        <div>
            <h1>Admin Dashboard</h1>
            <p>Welcome, {session?.user?.name}</p>
            <button onClick={() => signOut()}>Sign Out</button>
        </div>
    );
}

export default AdminDashboardScreen;