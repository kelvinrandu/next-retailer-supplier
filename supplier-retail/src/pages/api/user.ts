import { NextApiRequest, NextApiResponse} from 'next';
import prisma from '../../../lib/prisma'

// POST /api/user
// Required fields in body: name, email, phone
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const result = await prisma.user.create({
    data: {
      ...req.body,
    },
  })
  res.json(result)
}
