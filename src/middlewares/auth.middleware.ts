import {
    NextResponse,
    type NextRequest,
    type NextFetchEvent
} from "next/server";

import { CustomMiddleware } from "@/middlewares/chain";

export function AuthMiddleware(): CustomMiddleware {
    return async (req: NextRequest, ev: NextFetchEvent, response: NextResponse) => {
        const pathName = req.nextUrl.pathname;
        const isAuth = pathName === "/auth";
        
    };
}