import type { NextApiRequest, NextApiResponse } from 'next';


export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return res.status(200).json({ message: 'Hello from API Request' })
  } else {
    return res.status(405).json({ message: `${req.method} Not Allowed` });
  }
}
