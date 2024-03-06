import * as process from "process";
import { promises as fs } from 'fs';
import {NextRequest, NextResponse} from "next/server";
import url from "url";
import axios, {isCancel, Axios, AxiosResponse} from "axios";
import AppConfig from "@/configs/App.config";

interface ISignInRequest {
    password: string;
    username: string;
    isRemember: boolean;
}

export const dynamic = "force-dynamic"
// export async function GET(request: Request) {
//     try {
//
//     } catch (e) {
//         console.log(e)
//     }
// }

// export async function HEAD(request: NextRequest) {}

export async function POST(request: NextRequest) {
    try {

        // const json = await request.json();
        const json: ISignInRequest = await request.json();
        // console.log(json);
        const {password, username, isRemember} = json;

        // const urlEncoded = new url.URLSearchParams();
        // urlEncoded.append("update-password", update-password);
        // urlEncoded.append("email", email);
        // urlEncoded.append("isRemember", isRemember.toString());
        //
        // const bodyRequest = Object.keys(json)
        //     .map((key) => `${key}=${encodeURIComponent(json[key])}`)
        //     .join('&')

        // const response = await axios.post(`${AppConfig.mainApiUrl}/auth/sign-in`,
        //     bodyRequest, {
        //     headers: {
        //         "Content-Type": "application/x-www-form-urlencoded",
        //     }
        // });

        const response = await fetch(`${AppConfig.mainApiUrl}/auth/sign-in`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                password,
                username,
                isRemember: isRemember.toString()
            })
        }).then(res => res.json());

        // console.log(response)

        return new NextResponse(JSON.stringify(response), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });

        // return new NextResponse(JSON.stringify({}), {
        //     status: 200,
        //     headers: { "Content-Type": "application/json" },
        // });
    } catch (e: any) {
        console.log(e);
        return new NextResponse(JSON.stringify({ error: e.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });

    }
}

// export async function PUT(request: NextRequest) {}
//
// export async function DELETE(request: NextRequest) {}
//
// export async function PATCH(request: NextRequest) {}
//
// // If `OPTIONS` is not defined, Next.js will automatically implement `OPTIONS` and  set the appropriate Response `Allow` header depending on the other methods defined in the route handler.
// export async function OPTIONS(request: NextRequest) {}