"use client";

import { addToken } from '@/actions/cookie-action';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const InvalidToken = () => {

    const t = useTranslations("common");

    const router = useRouter()

    const goToHome = () => {
        addToken().then(() => {
            router.push("/");
        }).catch(error => {
            console.error(error);
        })
    }

    useEffect(() => {
        
        addToken().then(() => {
            console.log("token is create");
        }).catch(error => {
            console.error(error);
        })

    }, []);

    return (
        <div className="error-box">
            <p>{t("invalidToken")}</p>
            <button className="btn btn-primary" onClick={() => goToHome()}>
                {t("home")}
            </button>
        </div>
    )
}
