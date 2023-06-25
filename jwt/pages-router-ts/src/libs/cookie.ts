import { serialize } from "cookie";
import { NextApiResponse } from "next";

const COOKIE_NAME = process.env.JWT_COOKIE_NAME || 'TOKEN';
const JWT_EXPIRES_IN_MS = process.env.JWT_EXPIRES_IN_MS || '15000';

export function setToken(res: NextApiResponse, token: string) {
    //removeToken(res);
    const cookie = serialize(COOKIE_NAME, token, {
        httpOnly: true,
        path: "/",
        maxAge: parseInt(JWT_EXPIRES_IN_MS)
    });
    res.setHeader("Set-Cookie", cookie);
}

export function removeToken(res: NextApiResponse) {
    res.setHeader('Set-Cookie', [
        serialize(COOKIE_NAME, '', { 
            maxAge: -1
        })
    ]);
}