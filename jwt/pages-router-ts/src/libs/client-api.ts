import axios from "axios";

const instance = axios.create({
    baseURL: '',
    timeout: 30000,
    timeoutErrorMessage: "Time out!",
});

export async function callLoginApi(username: string, password: string) {
    return await instance
        .post("/api/auth/login", {
            username,
            password,
        })
};

export async function callLogoutApi() {
    return await instance.post("/api/auth/logout")
};

export async function callHeloApi(token: string, ip: string) {
    return await instance.get(`${process.env.NEXT_PUBLIC_HOST}/api/hello`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'x-forwarded-for': ip
        }
    })
};
