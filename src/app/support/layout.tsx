"use client"

// import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import React from "react";
import Head from "next/head";
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] })

// export const metadata: Metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// }

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <div className={"max-w-[390px] h-full w-full relative inline-block "}>
            {children}
        </div>
        </body>
        </html>
    )
}
