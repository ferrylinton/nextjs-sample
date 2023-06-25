import { NextRequest, NextResponse } from "next/server";
import { verify } from "./libs/jwt";

// const SECURE_HTTP_METHOD = ''

export default function middleware(req: NextRequest) {
    console.log(req.url);
    console.log(req.method);

    return verify(req);
}


export const config = {
    matcher: [
        //'/profile', '/api/hello'
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!login|api/auth/|_next/static|_next/image|favicon.ico).*)',
    ],
}