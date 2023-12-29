import { NextRequest, NextResponse } from 'next/server';
//@ts-ignore
import { verify } from "jsonwebtoken";

export async function POST(request: NextRequest) {
    try {
        const requestBody = await request.json();
        const accessToken = requestBody.access_token;
        // const validateUser = await fetch(`https://graph.facebook.com/v11.0/me?fields=id%2Cname%2Cemail&access_token=${accessToken}`)

        const validateUser = await verify(accessToken, "chaomungden");
        // console.log(" validate: ", validateUser);
        if (!validateUser) {
            return new NextResponse(
                JSON.stringify({
                    status: 400,
                    message: "not validate",
                    data: {}
                }),
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    status: 400
                }
            )
        }

        return new NextResponse(
            JSON.stringify({
                status: 200,
                message: "validated user",
                data: {
                    user: validateUser
                }
            }),
            {
                headers: {
                    "Content-Type": "application/json",
                },
                status: 200
            }
        )
    } catch (e: any) {
        return new NextResponse(
            JSON.stringify({
                status: 400,
                message: "error",
                data: {
                    error: e.message
                }
            }),
            {
                headers: {
                    "Content-Type": "application/json",
                },
                status: 400
            }
        )
    }
}