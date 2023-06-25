import { verifyToken } from '@/libs/jose';
import type { NextApiRequest, NextApiResponse } from 'next';


const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method === 'POST') {
        const { token } = req.body;

        try {
            const payload = await verifyToken(token);
            return res.status(200).json({
                payload
            });
        } catch (error: any) {
            console.log(error);

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