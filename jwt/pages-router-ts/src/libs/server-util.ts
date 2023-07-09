import { GetServerSidePropsContext } from "next";
import { JWT_COOKIE_NAME } from "./constant";

export function getToken(context: GetServerSidePropsContext) {
    const token = context.req?.cookies[JWT_COOKIE_NAME];

    if (token) {
        return token;
    } else {
        context.res.writeHead(302, { Location: '/login' });
        context.res.end();
    }
}

export function getIp(context: GetServerSidePropsContext) {
    try {
        let ip = context.req.headers["x-real-ip"];
        if (!ip) {
            const forwardedFor = context.req.headers["x-forwarded-for"];
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