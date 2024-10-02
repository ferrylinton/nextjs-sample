"use client";

import React, { useContext, useEffect, useState } from 'react'
import { ConfirmContext } from './confirm-context';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';

export type ConfirmProviderProps = {
    children: React.ReactNode;
};

export type ResolveProps = {
    resolve: (value: boolean) => void
}

const ConfirmProvider = ({ children }: ConfirmProviderProps) => {

    const t = useTranslations('common');

    const [mounted, setMounted] = useState(false);

    const [message, setMessage] = useState("");

    const [answer, setAnswer] = useState<ResolveProps | null>(null);

    const confirm = () => new Promise<boolean>((resolve) => {
        setAnswer({ resolve });
    });

    const handleClose = () => {
        setAnswer(null);
    };

    const handleConfirm = () => {
        answer?.resolve(true);
        handleClose();
    };

    const handleCancel = () => {
        answer?.resolve(false);
        handleClose();
    };

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <ConfirmContext.Provider value={{ confirm, setMessage }}>
            {mounted && <>{children} <div className={clsx("confirm", answer !== null && "show")}>
                <div className="confirm-content">
                    <p>{message}</p>
                    <section>
                        <button className="btn btn-secondary" onClick={handleCancel}>
                            {t("cancel")}
                        </button>
                        <button className="btn btn-primary" onClick={handleConfirm}>
                            {t("ok")}
                        </button>
                    </section>
                </div>
            </div></>}
        </ConfirmContext.Provider>

    )
}

const useConfirmContext = () => {
    const context = useContext(ConfirmContext);

    if (context === undefined) {
        throw new Error(
            "useThemeContext must be used within a ThemeContextProvider"
        );
    }

    return context;
};

export { ConfirmProvider, useConfirmContext };