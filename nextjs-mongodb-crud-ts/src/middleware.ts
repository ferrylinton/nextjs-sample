import { headers } from "next/headers";
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { isExceedRateLimit } from "./services/rate-client-service";


export async function middleware(request: NextRequest) {
    const ip = headers().get("x-forwarded-for") || "unknown";
    const result = await isExceedRateLimit(ip as string);

    if (result) {
        return NextResponse.redirect(new URL('/ratelimiterror', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        {
            source: "/((?!api/ratelimit|ratelimiterror|_next/static|_next/image|favicon.ico).*)",
            missing: [
                { type: "header", key: "next-router-prefetch" },
                { type: "header", key: "next-action" },
                { type: "header", key: "purpose", value: "prefetch" },
            ],
        },
    ],
};