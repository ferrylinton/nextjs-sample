import Cookies from 'js-cookie';
import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';
import { USER_COOKIE_NAME } from './libs/constant';
import { useRouter } from 'next/router';
import { callLogoutApi } from './libs/client-api';
import { getUserFromCookie } from './libs/client-util';


export const AppContext = createContext<AppContextType>({
    user: null,
    setAuthtenticatedUser: (user: AuthenticatedUser | null) => { console.log(user) },
    getAuthtenticatedUser: () => { return null },
    logout: () => { },
});

export const AppProvider = ({ children }: PropsWithChildren) => {

    const [user, setUser] = useState<AuthenticatedUser | null>(null);

    const { push } = useRouter();

    const setAuthtenticatedUser = (user: AuthenticatedUser | null) => {
        setUser(user);
    }

    const getAuthtenticatedUser = () => {
        const userCookie = Cookies.get(USER_COOKIE_NAME);
        if (userCookie) {
            return JSON.parse(userCookie);
        }

        return null;
    }

    useEffect(() => {
        if (!user) {
            setAuthtenticatedUser(getUserFromCookie());
        }

    }, [])

    const logout = async () => {
        try {
            const response = await callLogoutApi();

            if (response.status === 200 && response.data) {
                setAuthtenticatedUser(response.data);
            }
        } catch (error) {
            console.log(error);
        }

        setUser(null);
        push('/login');
    }

    const value: AppContextType = {
        user,
        setAuthtenticatedUser,
        getAuthtenticatedUser,
        logout
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}



export const useAppContext = () => useContext(AppContext);