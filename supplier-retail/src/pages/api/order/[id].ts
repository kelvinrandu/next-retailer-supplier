import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";
// PUT /api/order/:id
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const orderId = req.query.id;
  const order = await prisma.order.update({
    where: { id: Number(orderId) },
    data: { read: true},
  });
  res.json(order);
}
