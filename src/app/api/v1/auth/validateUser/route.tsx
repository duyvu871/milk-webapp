import { NextRequest, NextResponse } from 'next/server';
// import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
    try {
        const requestBody = await request.json();
        const accessToken = requestBody.access_token;
        // const validateUser = await fetch(`https://graph.facebook.com/v11.0/me?fields=id%2Cname%2Cemail&access_token=${accessToken}`)

        return new NextResponse(
            JSON.stringify({
                status: 200,
                message: "oke",
                data: {
                    // user: validateUser.json()
                }
            }),
            {
                headers: {
                    "Content-Type": "application/json",
                },
                status: 200
            }
        )
    } catch (e) {
        return new NextResponse(
            JSON.stringify({
                status: 400,
                message: "error",
                data: {
                    // user: validateUser.json()
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