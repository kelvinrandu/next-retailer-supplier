import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../lib/prisma'
// PUT /api/publish/:id
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const postId = req.query.id
  const { price, name} = req.body
  const item = await prisma.item.update({
    where: { id: Number(postId) },
    data: { name: name, price:price },
  })
  res.json(item)
}