import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../lib/prisma'


export default async function handle(req: NextApiRequest, res: NextApiResponse) {
   
  const { receipt, amount, itemId,fromEmail, toEmail, totalPrice,} = req.body
  const result = await prisma.order.create({
    data: {    
      receipt : receipt,
      itemAmount: parseInt(amount),
      totalPrice : parseInt(totalPrice),
      from : { connect: { email: fromEmail} },
      item : { connect: { id: parseInt(itemId) } },
      to : { connect: { email: toEmail } },
    },
  })
  res.json(result)
}