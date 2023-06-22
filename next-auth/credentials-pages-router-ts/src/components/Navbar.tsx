import Link from 'next/link';
import { useRouter } from 'next/router';


export default function Navbar() {

    const { asPath } = useRouter();

    return (
        <nav className='flex items-center h-[50px] border-b px-3'>
            <Link href='/' className='uppercase border border-slate-300 py-2 px-5 leading-none rounded-full bg-slate-200'>next-auth</Link>
            <Link href='/' className={`ms-2 px-2 ${asPath === '/' ? 'font-bold' : ''}`}>Home</Link>
            <div className='ml-auto flex justify-center items-center gap-2'>
                <Link href='/login' className={`ms-2 px-2 ${asPath === '/login' ? 'font-bold' : ''}`}>Login</Link>
            </div>
        </nav>
    )
}