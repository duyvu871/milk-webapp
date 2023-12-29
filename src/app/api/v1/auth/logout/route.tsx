import {NextRequest, NextResponse} from "next/server";


export async function POST(req: NextRequest) {
    const {} = await req.json();
    return new NextResponse(JSON.stringify({}), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        }
    });
}