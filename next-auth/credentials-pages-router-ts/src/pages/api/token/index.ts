import { generateToken } from '@/libs/jose';
import { signJwtAccessToken } from '@/libs/jwt';
import type { NextApiRequest, NextApiResponse } from 'next';


const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method === 'POST') {
        const { username, password } = req.body;

        if (username === 'admin' && password === 'admin') {
            const accessToken = await generateToken({
                "username": "ferrylinton",
                "authorities": ['aaa', 'bbb', 'ddd']
            });

            return res.status(200).json({
                access_token: accessToken
            });
        }

        res.status(401).json({
            message: "Wrong credentials"
        });

    } else {
        res.status(405).json({ message: `${req.method} Not Allowed` });
    }
}

export default handler;