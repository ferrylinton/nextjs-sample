import Cookies from "js-cookie";
import { USER_COOKIE_NAME } from "./constant";


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