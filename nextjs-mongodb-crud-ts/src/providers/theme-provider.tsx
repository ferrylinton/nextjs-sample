"use client";

import { FC, useContext, useEffect, useState } from "react";
import { DEFAULT_THEME, THEME_LOCAL_STORAGE_KEY, THEME_VALUES, Theme, ThemeContext } from "@/providers/theme-context";
import clsx from "clsx";


export type ThemeProviderProps = {
    children: React.ReactNode;
};

const isValidTheme = (value: string): value is Theme =>
    THEME_VALUES.includes(value);

const getThemeFromLocalStorage = (): Theme => {
    if (typeof window === "undefined") return DEFAULT_THEME;

    const themeValue = localStorage.getItem(THEME_LOCAL_STORAGE_KEY);

    if (themeValue && isValidTheme(themeValue)) return themeValue;

    return DEFAULT_THEME;
};


const ThemeContextProvider: FC<ThemeProviderProps> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>(getThemeFromLocalStorage);
    const [mounted, setMounted] = useState(false);

    const toggleTheme = () =>
        setTheme((oldTheme) =>
            oldTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
        );

    useEffect(() => {
        localStorage.setItem(THEME_LOCAL_STORAGE_KEY, theme);
    }, [theme]);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {mounted && <div className={clsx("page-container", theme)}>{children}</div>}
        </ThemeContext.Provider>
    );
};

const useThemeContext = () => {
    const context = useContext(ThemeContext);

    if (context === undefined) {
        throw new Error(
            "useThemeContext must be used within a ThemeContextProvider"
        );
    }

    return context;
};

export { ThemeContextProvider, useThemeContext };