import { JWT_EXPIRES_IN, JWT_SECRET } from "@/utils/env-constant";
import logger from "@/utils/winston";
import { SignJWT, jwtVerify } from "jose";

const key = new TextEncoder().encode(JWT_SECRET);

export async function encrypt(payload: any) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime(JWT_EXPIRES_IN)
        .sign(key);
}

export async function decrypt(input: string): Promise<any> {
    const { payload } = await jwtVerify(input, key, {
        algorithms: ["HS256"],
    });
    return payload;
}

export async function isTokenValid(ip: string, token: string) {
    if (token && ip) {
        try {
            const payload = await decrypt(token);
            return payload.ip === ip;
        } catch (error: any) {
            logger.error(error);
        }
    }

    return false;
}