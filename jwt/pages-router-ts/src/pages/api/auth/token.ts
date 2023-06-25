import { removeToken, setToken } from '@/libs/cookie';
import { generateToken } from '@/libs/jose';
import type { NextApiRequest, NextApiResponse } from 'next';


const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method === 'POST') {
        const { username, password } = req.body;

        if (username === 'admin' && password === 'admin') {
            const token = await generateToken({
                "username": "ferrylinton",
                "authorities": ['aaa', 'bbb', 'ddd']
            });

            setToken(res, token);
            return res.status(200).json({
                token
            });
        } else {
            removeToken(res);
            return res.status(401).json({
                message: "Wrong credentials"
            });
        }

    } else {
        return res.status(405).json({ message: `${req.method} Not Allowed` });
    }
}

export default handler;