import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'
import LocaleSwitcher from './LocaleSwitcher';

const languages = {
    "id": "Indonesia",
    "en": "English"
}

function Navbar() {

    const { locale, locales, pathname } = useRouter();

    return (
        <nav className='flex items-center h-[50px] border-b px-3'>
            <Link href='/' className='uppercase border border-slate-300 py-2 px-5 leading-none rounded-full bg-slate-200'>next-intl</Link>
            <Link href='/' className={`ms-2 px-2 ${pathname === '/' ? 'font-bold' : ''}`}>Home</Link>
            <Link href='/about' className={`ms-2 px-2 ${pathname === '/about' ? 'font-bold' : ''}`}>About</Link>
            <div className='ml-auto flex justify-center items-center gap-2'>
                {
                    locales?.map(lang => {
                        return <Link
                            href={pathname}
                            className={`${locale===lang ? 'font-bold': ''}`}
                            locale={lang}
                            key={lang}>
                            {languages[lang as keyof typeof languages]}
                        </Link>
                    })
                }
                <LocaleSwitcher/>
            </div>
        </nav>
    )
}

export default Navbar