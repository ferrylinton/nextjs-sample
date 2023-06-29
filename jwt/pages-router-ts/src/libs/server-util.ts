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