import { SignJWT, jwtVerify } from 'jose';
import { JWT_EXPIRES_IN_MS, JWT_SECRET_KEY } from "./constant";
import { randomId } from "./string-util";


const alg = 'HS256';

function getExpirationTime() {
    const jwtExpires = parseInt(JWT_EXPIRES_IN_MS) / 1000;
    return jwtExpires + 's';
}

export async function generateToken(data: string, ip: string) {
    console.log('generate token ....');
    console.log(JWT_SECRET_KEY + ip);
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

