import { NextRequest, NextResponse } from "next/server";
import { verifyRequest } from "./libs/jwt";

const PUBLIC_FILE = /\.(.*)$/;

export default function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    console.log("Middleware", { pathname });

    if (PUBLIC_FILE.test(pathname) ||
        pathname.startsWith('/api/auth/') ||
        pathname === '/') {

        return NextResponse.next();
    } else {
        return verifyRequest(req);
    }

}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - login
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!login|_next/static|_next/image|favicon.ico|.svg).*)',
    ],
}