import { generateToken } from '@/libs/jose';
import { GetServerSidePropsContext } from 'next';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';

type Props = {
    callbackUrl: string
}

export default function LoginPage({ callbackUrl }: Props) {

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

        await signIn('credentials', {
            username,
            password,
            redirect: false
        }).then((response) => {
            console.log(response);
            if (response?.ok) {
                router.push(callbackUrl || '/profile')
            } else {
                setError(true);
            }
        }).catch((error) => {
            setError(true);
            console.log(error);
        });
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
    const callbackUrl = context.query.callbackUrl || null;

    return {
        props: {
            callbackUrl
        },
    };
}