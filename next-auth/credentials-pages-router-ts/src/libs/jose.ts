import { jwtVerify, SignJWT } from 'jose';
import { nanoid } from 'nanoid';

const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);

const alg = 'HS256';

export const verifyToken = async (token: string) => {
    const { payload } = await jwtVerify(token, secret);
    return payload;
}

export const generateToken = async (data: any) => {
    return await new SignJWT(data)
    .setProtectedHeader({ alg })
    .setJti(nanoid())
    .setIssuedAt()
    .setExpirationTime('15s')
    .sign(secret)
  
}