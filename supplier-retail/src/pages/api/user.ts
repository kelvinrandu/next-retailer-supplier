import { NextApiRequest, NextApiResponse} from 'next';
import prisma from '../../../lib/prisma'

// POST /api/user
// Required fields in body: name, email, phone, isSupplier
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    handleCREATE(req, res)
  } else if (req.method === 'DELETE') {
    handleUPDATE(req, res)
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    )
  }

}


async function handleCREATE(res, req) {
  const result = await prisma.user.create({
    data: {
      ...req.body,
    },
  })
  res.json(result)
}


// GET /api/post/:id
async function handleUPDATE(req, res) {
  const post = await prisma.user.update({
    where: { email: req.body.email },
    data: { isSupplier: req.body.isSupplier },
  })
  res.json(post)
}

