import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';


export default function SecureNavbar() {

    const { pathname } = useRouter();

    const handleSignOut = async (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        await signOut();
    }

    return (
        <nav className='flex items-center h-[50px] border-b px-3'>
            <Link href='/' className='uppercase border border-slate-300 py-2 px-5 leading-none rounded-full bg-slate-200'>next-auth</Link>
            <Link href='/' className={`ms-2 px-2 ${pathname === '/' ? 'font-bold' : ''}`}>Home</Link>
            <div className='ml-auto flex justify-center items-center gap-2'>
                <Link href="#" onClick={handleSignOut} className="btn-signin">Sign out</Link>
            </div>
        </nav>
    )
}