import { serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import { JWT_COOKIE_NAME, JWT_EXPIRES_IN_MS, USER_COOKIE_NAME } from "./constant";


export function getIp(req: NextApiRequest) {
    try {
        let ip = req.headers["x-real-ip"];
        if (!ip) {
            const forwardedFor = req.headers["x-forwarded-for"];
            if (Array.isArray(forwardedFor)) {
                ip = forwardedFor.at(0);
            } else {
                ip = forwardedFor?.split(",").at(0) ?? "Unknown";
            }
        }
        return ip as string;
    } catch (error) {
        console.log(error);
    }

    return 'Unknown';
}


export function addTokenCookie(res: NextApiResponse, user: string, token: string) {
    res.setHeader("Set-Cookie", [
        serialize(JWT_COOKIE_NAME, token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            path: "/",
            maxAge: parseInt(JWT_EXPIRES_IN_MS)
        }),
        serialize(USER_COOKIE_NAME, user, {
            httpOnly: false,
            secure: false,
            sameSite: 'strict',
            path: "/",
            maxAge: parseInt(JWT_EXPIRES_IN_MS)
        })
    ]);
}

export function clearCookies(res: NextApiResponse) {
    res.setHeader('Set-Cookie', [
        serialize(JWT_COOKIE_NAME, '', {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            path: "/",
            maxAge: -1
        }),
        serialize(USER_COOKIE_NAME, '', {
            httpOnly: false,
            secure: false,
            sameSite: 'strict',
            path: "/",
            maxAge: -1
        })
    ]);
}