'use client'

import { useAppContext } from '@/app-context';
import Link from 'next/link';
import { useRouter } from 'next/router';


export default function Navbar() {

    const { user, logout } = useAppContext();

    const router = useRouter();

    const handleLogout = async (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        logout();
    }

    return (
        <nav className='flex items-center h-[50px] border-b px-3'>
            <Link href='/' className='uppercase border border-slate-300 py-2 px-5 leading-none rounded-full bg-slate-200'>jwt-jose</Link>
            <Link href='/' className={`ms-2 px-2 ${router.pathname == '/' ? 'font-bold' : ''}`}>Home</Link>
            {
                user && <div className='ml-auto flex justify-center items-center gap-2'>
                    <Link href='/profile' className={`ms-2 px-2 ${router.pathname == '/profile' ? 'font-bold' : ''}`}>Profile</Link>
                    <Link href="#" onClick={handleLogout} className="btn-signin">Logout</Link>
                </div>
            }
            {
                !user && <div className='ml-auto flex justify-center items-center gap-2'>
                    <Link href='/login' className={`ms-2 px-2 ${router.pathname == '/login' ? 'font-bold' : ''}`}>Login</Link>
                </div>
            }
        </nav>
    )


}