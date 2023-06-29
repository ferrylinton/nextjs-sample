import { serialize } from "cookie";
import Cookies from "js-cookie";
import { NextApiResponse } from "next";
import { JWT_COOKIE_NAME, JWT_EXPIRES_IN_MS, USER_COOKIE_NAME } from "./constant";


export function saveToken(res: NextApiResponse, user: string, token: string) {
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

export function getUserFromCookie() {
    let userCookies = Cookies.get(USER_COOKIE_NAME);

    try {
        if (userCookies) {
            const user:AuthenticatedUser = JSON.parse(userCookies);

            if(user && user.username && user.username){
                return user;
            }
        }
    } catch (error) {
        console.log(error);
    }

    return null;
}