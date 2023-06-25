
import { PropsWithChildren } from 'react';
import Navbar from './Navbar';
import SecureNavbar from './SecureNavbar';
import { GetServerSidePropsContext } from 'next';

const COOKIE_NAME = process.env.JWT_COOKIE_NAME || 'TOKEN';

type Props = {
    token?: string
} & PropsWithChildren;

export default function Layout({ token, children }: Props) {

    const navbar = token ? <SecureNavbar /> : <Navbar />;
    return (
        <>
            {navbar}
            {children}
        </>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const token = context.req?.cookies[COOKIE_NAME];
    console.log(token);

    return {
        props: {
            token
        }
    };
}