import { login } from '@/libs/auth';
import { verifyToken } from '@/libs/jose';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';

const COOKIE_NAME = process.env.JWT_COOKIE_NAME || 'TOKEN';


export default function LoginPage() {

    const router = useRouter()

    const [error, setError] = useState(false);

    const [state, setState] = useState({
        username: "",
        password: ""
    });

    const onFieldChange = (event: any) => {
        let value = event.target.value;
        setState({ ...state, [event.target.name]: value });
    };

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { username, password } = state;

        try {
            const response = await login(username, password);
            console.log(response);
            console.log(response.status);
            console.log(response.status === 200)
            if (response.status === 200) {
                router.push('/profile')
            } else {
                setError(true);
            }
        } catch (error) {
            console.log(error);
            setError(true);
        }

    };

    return (
        <main className='flex flex-col h-[calc(100vh-50px)] items-center justify-center'>
            <div className="text-xl uppercase pb-5 text-slate-500">Login</div>
            {error && <div className='text-red-500 pb-4'>Invalid username or password</div>}
            <form
                className='w-[300px] flex flex-col gap-3'
                noValidate
                autoComplete='off'
                onSubmit={onSubmit}>

                <input
                    className={`w-full p-3 text-sm leading-tight border border-slate-400 rounded focus:outline-none focus:ring-4`}
                    type="text"
                    placeholder="Username"
                    name='username'
                    maxLength={50}
                    onChange={onFieldChange}
                />

                <input
                    className={`w-full p-3 text-sm leading-tight border border-slate-400 rounded focus:outline-none focus:ring-4`}
                    type="password"
                    placeholder="Password"
                    name='password'
                    maxLength={50}
                    onChange={onFieldChange}
                />

                <button
                    type="submit"
                    className='w-full p-3 text text-slate-100 hover:text-white uppercase leading-tight border border-blue-600 bg-blue-500 hover:bg-blue-600 rounded'>Login</button>

            </form>
        </main>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    // const token = context.req?.cookies[COOKIE_NAME];

    // if (token && token.length > 10) {
    //     try {
    //         await verifyToken(token);
    //         return {
    //             redirect: {
    //                 permanent: false,
    //                 destination: "/login",
    //             },
    //             props: {},
    //         };
    //     } catch (error: any) {
    //         console.log(error);
    //     }
    // }

    return {
        props: {}
    };
}