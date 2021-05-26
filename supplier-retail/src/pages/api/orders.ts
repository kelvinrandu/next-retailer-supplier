import { NextApiRequest, NextApiResponse} from 'next';
import prisma from '../../../lib/prisma'
import { getSession } from 'next-auth/client'

export default async function getOrders(req: NextApiRequest, res: NextApiResponse){
    const orders: object | null = await prisma.order.findMany({
      where: {
        to: { email: 'randukelvin@gmail.com' },
      }, 
     
        select: {
          id:true,
          receipt:true,
          from: {
              select:{
              name:true,
              phone:true,
              }
          }
         
     
        },
       
      })

      res.json(orders)
      console.log(orders)
    

}