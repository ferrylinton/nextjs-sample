import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./jose";

const COOKIE_NAME = process.env.JWT_COOKIE_NAME || 'TOKEN';

export async function verify(req: NextRequest) {
    let token: string | undefined;

    if (req.cookies.has(COOKIE_NAME)) {
        console.log('cookies');
        token = req.cookies.get(COOKIE_NAME)?.value;
    } else if (req.headers.get("Authorization")?.startsWith("Bearer ")) {
        console.log('Authorization');
        token = req.headers.get("Authorization")?.substring(7);
    }
    console.log('middleware...........');
    console.log(token);

    if (token && token.length > 10) {
        try {
            await verifyToken(token);
            return NextResponse.next();
        } catch (error: any) {
            console.log(error);
            let message = (error.name === 'JWTExpired') ? 'Token is expired' : 'Invalid token';

            if (req.nextUrl.pathname.startsWith("/api")) {
                return NextResponse.json({ message }, { status: 401 })
            } else {
                return NextResponse.redirect(new URL(`/login?${new URLSearchParams({ message })}`, req.url));
            }
        }
    } else {
        if (req.nextUrl.pathname.startsWith("/api")) {
            return NextResponse.json({ message: 'Auth required' }, { status: 401 })
        }else{
            return NextResponse.redirect(new URL(`/login`, req.url));
        }
    }

    return;
}