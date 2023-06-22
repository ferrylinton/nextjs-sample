import React, { FormEvent, useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';

type Props = {}

export default function LoginPage({ }: Props) {

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
        console.log(state);

        const { username, password } = state;
        await signIn('credentials', {
            username,
            password,
            callbackUrl: `${window.location.origin}/profile`,
            redirect: true
        }).then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <main className='flex flex-col h-[calc(100vh-50px)] items-center justify-center'>
            <div className="text-xl uppercase pb-3 text-slate-500">Login</div>
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