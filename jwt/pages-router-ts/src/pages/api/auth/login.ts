import { saveToken } from '@/libs/cookie';
import { getIpFromApi } from '@/libs/header';
import { stringLastChars } from '@/libs/helper';
import { generateToken } from '@/libs/jwt';
import type { NextApiRequest, NextApiResponse } from 'next';


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    console.log(process.env.NODE_ENV);

    if (req.method === 'POST') {
        const { username, password } = req.body;

        if (username === 'admin' && password === 'admin') {
            const user = {
                "username": "ferrylinton",
                "authorities": ["aaa", "bbb", "ddd"]
            }
            const token = await generateToken(JSON.stringify(user), getIpFromApi(req));
            console.log(stringLastChars(token));

            saveToken(res, JSON.stringify(user), token);
            res.setHeader('Allow', ['POST']);
            return res.status(200).json({
                user,
                token
            });
        } else {
            return res.status(401).json({
                message: "Wrong credentials"
            });
        }

    } else {
        return res.status(405).json({ message: `${req.method} Not Allowed` });
    }
}

export default handler;