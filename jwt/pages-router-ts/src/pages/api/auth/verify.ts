import { getIpFromApi } from '@/libs/header';
import { verifyToken } from '@/libs/jwt';
import type { NextApiRequest, NextApiResponse } from 'next';


const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method === 'POST') {
        const { token } = req.body;

        try {
            const payload = await verifyToken(token, getIpFromApi(req));
            const user = JSON.parse(payload.sub as string) as AuthenticatedUser;
            return res.status(200).json({
                user
            });
        } catch (error: any) {

            if(error.name === 'JWTExpired'){
                return res.status(200).json({
                    message : "Token is expired"
                });
            }else{
                return res.status(200).json({
                    message : "Invalid token"
                });
            }
        }

    } else {
        res.status(405).json({ message: `${req.method} Not Allowed` });
    }
}

export default handler;