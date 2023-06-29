'use client'

import { useAppContext } from '@/app-context';
import Link from 'next/link';


export default function Navbar() {

    const { user, logout } = useAppContext();

    const handleSignOut = async (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        logout();
    }

    if (user) {
        return (
            <nav className='flex items-center h-[50px] border-b px-3'>
                <Link href='/' className='uppercase border border-slate-300 py-2 px-5 leading-none rounded-full bg-slate-200'>next-auth</Link>
                <Link href='/' className='ms-2 px-2'>Home</Link>
                <div className='ml-auto flex justify-center items-center gap-2'>
                    <Link href="#" onClick={handleSignOut} className="btn-signin">Logout</Link>
                </div>
            </nav>
        )
    } else {
        return (
            <nav className='flex items-center h-[50px] border-b px-3'>
                <Link href='/' className='uppercase border border-slate-300 py-2 px-5 leading-none rounded-full bg-slate-200'>next-auth</Link>
                <Link href='/' className='ms-2 px-2'>Home</Link>
                <div className='ml-auto flex justify-center items-center gap-2'>
                    <Link href='/login' className='ms-2 px-2'>Login</Link>
                </div>
            </nav>
        )
    }


}