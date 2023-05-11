import type { NextApiRequest, NextApiResponse } from 'next';
import Authority from '@/models/Authority';
import connect from '@/utils/mongodb';
import { getLogger } from '@/utils/logger';


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const logger = getLogger("API-AUTHORITIES");
    await connect();
    const { method } = req;

    switch (method) {
        case "GET":
            try {
                const authorities = await Authority.find({});
                res.status(200).json({ status: 'success', data: authorities });
            } catch (err: any) {
                res.status(400).json({
                    message: err.message,
                });
            }

            break;

        case "POST":
            try {
                const authority = await Authority.create(req.body);
                res.status(201).json({ status: 'success', data: authority });
            } catch (err: any) {
                logger.error(err);
                
                res.status(400).json({
                    message: err.message,
                });
            }

            break;

        default:
            res.setHeader("Allow", ["GET", "POST"]);
            res.status(405).json({
                message: `Method ${method} Not Allowed`,
            });
            
            break;
    }
}
