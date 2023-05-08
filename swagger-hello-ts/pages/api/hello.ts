// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'


/**
 * @swagger
 * /api/hello:
 *   get:
 *     tags:
 *       - Simple
 *     description: Returns the hello world
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema: 
 *             $ref: "#/components/schemas/Hello"
 *   
 */
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Hello>
): void {
  res.status(200).json({ name: 'John Doe' })
}
