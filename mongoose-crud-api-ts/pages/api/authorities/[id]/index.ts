import type { NextApiRequest, NextApiResponse } from 'next'
import Authority from '@/models/Authority';
import connect from '@/utils/mongodb';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    await connect();
    const { method } = req;

    switch (method) {
        case "GET":
            try {
                const id = req.query.id as string;
                const authority = await Authority.findById(id);
                res.status(200).json(authority);
            } catch (err: any) {
                res.status(400).json({
                    message: err.message,
                });
            }

            break;

        case "PUT":
            try {
                const id = req.query.id as string;
                const authority = await Authority.findByIdAndUpdate(id, req.body)
                res.status(200).json({ status: 'success', data: authority });
            } catch (err: any) {
                console.log(err);
                res.status(400).json({
                    message: err.message,
                });
            }

            break;

        case "DELETE":
            try {
                const id = req.query.id as string;
                const authority = await Authority.findByIdAndDelete(id)

                if(authority){
                    res.status(201).json({ status: 'success', data: authority });
                }else{
                    res.status(404).json({msg: "does not exist"})
                }
                
            } catch (err: any) {
                console.log(err);
                res.status(400).json({
                    message: err.message,
                });
            }

            break;

        default:
            res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
            res.status(405).json({
                message: `Method ${method} Not Allowed`,
            });

            break;
    }
}
