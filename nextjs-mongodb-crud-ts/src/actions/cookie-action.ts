'use server'

import { encrypt } from '@/libs/jwt';
import { TOKEN_COOKIE_EXPIRES } from '@/utils/env-constant';
import { cookies, headers } from 'next/headers'

export const addToken = async () => {
    const ip = headers().get("x-forwarded-for") || "unknown";
    const token = await encrypt({ ip });
    const expires = new Date(Date.now() + (TOKEN_COOKIE_EXPIRES * 1000));

    cookies().set({
        name: 'token',
        value: token,
        httpOnly: true,
        path: '/',
        expires
    })
}