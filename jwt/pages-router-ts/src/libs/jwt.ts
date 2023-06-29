import { SignJWT, jwtVerify } from 'jose';
import { NextRequest, NextResponse } from "next/server";
import { JWT_COOKIE_NAME, JWT_EXPIRES_IN_MS, JWT_SECRET_KEY, USER_COOKIE_NAME } from "./constant";
import { getIp } from "./header";
import { randomId } from "./helper";


const alg = 'HS256';

function getExpirationTime() {
    const jwtExpires = parseInt(JWT_EXPIRES_IN_MS) / 1000;
    return jwtExpires + 's';
}

function getTokenFromRequest(req: NextRequest) {
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

export async function generateToken(data: string, ip: string) {
    return await new SignJWT({})
        .setSubject(data)
        .setProtectedHeader({ alg })
        .setJti(randomId())
        .setIssuedAt()
        .setExpirationTime(getExpirationTime())
        .sign(new TextEncoder().encode(JWT_SECRET_KEY + ip))

}

export async function verifyToken(token: string, ip: string) {
    let message = 'Invalid token';

    if (token && token.length > 10) {
        try {
            const { payload } = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET_KEY + ip));
            return payload;
        } catch (error: any) {
            console.log(error);
            message = (error.name === 'JWTExpired') ? 'Token is expired' : 'Invalid token';
        }
    }

    return { message };
}

export async function verifyRequest(req: NextRequest) {
    const token = getTokenFromRequest(req);

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