export const JWT_COOKIE_NAME = 'TOKEN';
export const USER_COOKIE_NAME = 'USER';
export const JWT_EXPIRES_IN_MS = process.env.JWT_EXPIRES_IN_MS || '900000';
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'asdfqwer';