import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../lib/prisma'


export default async function handle(req: NextApiRequest, res: NextApiResponse) {
   
    const { price, quantity, name,fromEmail, toEmail, user} = req.body
    console.log(user)
    const result = await prisma.item.create({
      data: {    
        name : name,
        price: price,
        quantity : quantity,
        user : { connect: { email: user } },

      },
    })
    res.json(result)
}