'use client';

import { useRouter } from 'next/router';
import { ChangeEvent } from 'react';


const LocaleSwitcher = () => {

    const router = useRouter();

    function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
        router.push(router.pathname, router.pathname, { locale: event.target.value });
    }

    return (
        <>
        <select
            className="inline-flex border border-slate-300 py-1 px-3 rounded"
            value={router.locale}
            onChange={onSelectChange}>
            {
                router.locales?.map((lang) => (
                    <option key={lang} value={lang}>
                        {lang}
                    </option>
                ))
            }
        </select>
        </>
    )
}

export default LocaleSwitcher