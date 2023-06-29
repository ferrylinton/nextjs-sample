import { NextRequest, NextResponse } from "next/server";
import { JWT_COOKIE_NAME, JWT_EXPIRES_IN_MS, JWT_SECRET_KEY, USER_COOKIE_NAME } from "./constant";
import { jwtVerify } from "jose";



export async function verifyRequest(req: NextRequest) {
    const token = extractToken(req);

    if (token && token.length > 50) {
        try {
            await jwtVerify(token, new TextEncoder().encode(JWT_SECRET_KEY + getIp(req)));
            return NextResponse.next()
        } catch (error: any) {
            console.log(error);
            
            let message = (error.name === 'JWTExpired') ? 'Token is expired' : 'Invalid token';

            if (req.nextUrl.pathname.startsWith("/api")) {
                const response = NextResponse.json({ message }, { status: 401 });
                clearCookies(response);
                return response;
            } else {
                const response = NextResponse.redirect(new URL(`/login?${new URLSearchParams({ message })}`, req.url));
                clearCookies(response);
                return response;
            }
        }
    } else {
        if (req.nextUrl.pathname.startsWith("/api")) {
            return NextResponse.json({ message: 'Auth required' }, { status: 401 })
        } else {
            return NextResponse.redirect(new URL(`/login`, req.url));
        }
    }
}

function getIp(req: NextRequest) {
    try {
        let ip = req.ip ?? req.headers.get('x-real-ip');
        if (ip) {
            return ip;
        }

        const forwardedFor = req.headers.get('x-forwarded-for')
        if (forwardedFor) {
            return forwardedFor.split(',').at(0) ?? 'Unknown';
        }
    } catch (error) {
        console.log(error);
    }

    return 'Unknown';
}

function extractToken(req: NextRequest) {
    if (req.cookies.has(JWT_COOKIE_NAME)) {
        return req.cookies.get(JWT_COOKIE_NAME)?.value;
    } else if (req.headers.get("Authorization")?.startsWith("Bearer ")) {
        return req.headers.get("Authorization")?.substring(7);
    }

    return null;
}

function clearCookies(res: NextResponse) {
    res.cookies.delete(USER_COOKIE_NAME);
    res.cookies.delete(JWT_COOKIE_NAME);
}