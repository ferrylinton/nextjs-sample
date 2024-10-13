import { headers } from "next/headers";
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { isExceedRateLimit } from "./services/rate-client-service";
import { RateLimitResponse } from "./types/rate-type";
import { RATE_LIMIT_MAX } from "./utils/env-constant";


export async function middleware(request: NextRequest) {
    const ip = headers().get("x-forwarded-for") || "unknown";
    const result: RateLimitResponse = await isExceedRateLimit(ip, request.cookies.get("token")?.value);

    if (result.status === 401) {
        return NextResponse.redirect(new URL('/invalidtoken', request.url))
    }else if(result.errorMessage || (result.count && result.count > RATE_LIMIT_MAX)){
        return NextResponse.redirect(new URL('/ratelimiterror', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        {
            source: "/((?!invalidtoken|api/ratelimit|ratelimiterror|_next/static|_next/image|favicon.ico).*)",
            missing: [
                { type: "header", key: "next-router-prefetch" },
                { type: "header", key: "next-action" },
                { type: "header", key: "purpose", value: "prefetch" },
            ],
        },
    ],
};