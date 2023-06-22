import { useSession } from 'next-auth/react';
import { PropsWithChildren } from 'react';
import Navbar from './Navbar';
import SecureNavbar from './SecureNavbar';

export default function Layout({ children }: PropsWithChildren) {

    const { data: session } = useSession();

    return (
        <>
            {session && <SecureNavbar />}
            {!session && <Navbar />}
            {children}
        </>
    )
}