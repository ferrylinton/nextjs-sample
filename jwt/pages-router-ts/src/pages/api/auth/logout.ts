import { clearCookies } from '@/libs/api-util';
import type { NextApiRequest, NextApiResponse } from 'next';


const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method === 'POST') {
        try {
            clearCookies(res);
            return res.status(200).json({
                message: 'User is logout',
            });
        } catch (error: any) {
            console.log(error);
            return res.status(500).json({ message : error.message });
        }

    } else {
        res.status(405).json({ message: `${req.method} Not Allowed` });
    }
}

export default handler;