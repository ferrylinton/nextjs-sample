import axios from "axios";

const instance = axios.create({
    baseURL: '',
    timeout: 30000,
    timeoutErrorMessage: "Time out!",
});

export async function login(username: string, password: string) {
    return await instance
        .post("/api/auth/token", {
            username,
            password,
        })
};