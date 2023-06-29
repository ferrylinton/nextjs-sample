import { NextRequest } from "next/server";
import { verifyRequest } from "./libs/jwt";


export default function middleware(req: NextRequest) {
    return verifyRequest(req);
}

export const config = {
    matcher: [
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